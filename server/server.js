const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');

const app = express();
const mongoose = require('mongoose');
// const async = require('async');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Models
const { User } = require('./models/user');
const { ToolType } = require('./models/toolType');
const { OperationType } = require('./models/operationType');
const { Tool } = require('./models/tool');

// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//=================================
//             TOOLS
//=================================

app.get('/api/product/tools', (req, res) => {
  const { id, operation } = req.query;
  const filter = {};

  if (id) {
    return Tool.findById(id)
      .populate('toolType')
      .populate('operationType')
      .exec((err, docs) => {
        return res.status(200).send(docs);
      });
  }

  if (operation) {
    filter.operationType = operation;
  }

  Tool.find(filter)
    .populate('toolType')
    .populate('operationType')
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

app.post('/api/product/tools', auth, admin, (req, res) => {
  const tool = new Tool(req.body);

  tool.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc,
    });
  });
});

//=================================
//              OPERATION TYPES
//=================================

app.post('/api/product/operation-types', auth, admin, (req, res) => {
  const operationType = new OperationType(req.body);

  operationType.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      operationType: doc,
    });
  });
});

app.get('/api/product/operation-types', (req, res) => {
  const { id, tooltype, shortname } = req.query;
  let filter = {};

  if (id) {
    filter._id = id;
  }

  if (tooltype) {
    filter.toolTypeId = tooltype;
  }

  if (shortname) {
    filter.shortname = shortname;
  }

  OperationType.find(filter, (err, operationTypes) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(operationTypes);
  });
});

//=================================
//              TOOL TYPES
//=================================

app.post('/api/product/tool-types', auth, admin, (req, res) => {
  const toolType = new ToolType(req.body);

  toolType.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      toolType: doc,
    });
  });
});

app.get('/api/product/tool-types', (req, res) => {
  const shortname = req.query.shortname;

  if (shortname) {
    ToolType.findOne({ shortname }, (err, toolType) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(toolType);
    });
  } else {
    ToolType.find({}, (err, toolTypes) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(toolTypes);
    });
  }
});

// //=================================
// //              USERS
// //=================================

app.get('/api/users/auth', auth, (req, res) => {
  const { role, email, name, lastname, cart, history } = req.user;

  res.status(200).json({
    isAdmin: role === 0 ? false : true,
    isAuth: true,
    email,
    name,
    lastname,
    role,
    cart,
    history,
  });
});

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body);

  user.save((err) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: 'Неверный адрес электронной почты',
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: 'Неправильный пароль',
        });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('i_auth', user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

// //=================================
// //              IMAGE
// //=================================

app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.pic.path,
    (result) => {
      console.log(result);
      res.status(200).send({
        id: result.public_id,
        url: result.url,
        name: result.original_filename,
      });
    },
    {
      public_id: `dtools/tools/${uuidv4()}`,
      resource_type: 'auto',
    }
  );
});

app.get('/api/users/removeimage', auth, admin, (req, res) => {
  let id = req.query.id;
  console.log(id);

  cloudinary.uploader.destroy(id, (error, result) => {
    if (error) return res.json({ succes: false, error });
    res.status(200).send({ result });
  });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
