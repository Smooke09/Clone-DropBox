var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/file', (req, res) => {

  let path = req.query.filepath;
  console.log(path);
  if (fs.existsSync(path)) {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.error(err);
        res.status(400).json({
          error: err
        });
      } else {
        res.status(200).end(data);
      }
    });
  } else {
    res.status(200).end(data);
  };
}
);


router.delete('/file', (req, res) => {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  form.parse(req, (err, fields, files) => {

    let path = fields.filepath;

    // console.log(fields);
    if (fs.existsSync(path)) {
      fs.unlink(path, err => {
        if (err) {
          res.status(400).json({
            err
          })
        } else {
          res.json({
            fields
          });
        }
      });
    }
  });
});

router.post('/upload', (req, res) => {

  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  })

  form.parse(req, (err, fields, files) => {
    res.json({
      files

    })
    // console.log(files)
  })
})

module.exports = router;