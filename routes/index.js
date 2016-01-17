var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    Post.find().sort('-createdAt').exec().then(function (posts) {
        res.render('index', {
            title: '文章列表',
            posts: posts
        });
    }, next);
});

router.get('/add', function (req, res, next) {
    res.render('add', {
        title: '新增文章'
    });
});

router.post('/add', function (req, res, next) {
    var data = req.body;

    Post.create(data).then(function (post /**建立好的資料 */) {
        res.redirect('/');
    }, next);
});

router.get('/view', function (req, res, next) {
    var query = req.query;
    var id = query.id;

    Post.findById(id).exec().then(function (post) {
        res.render('view', {
            title: '檢視文章',
            post: post
        });
    }, next);
});

router.get('/edit/:id', function (req, res, next) {
    var params = req.params;
    var id = params.id;

    Post.findById(id).exec().then(function (post) {
        res.render('edit', {
            title: '檢視文章',
            post: post
        });
    }, next);
});

router.post('/edit/:id', function (req, res, next) {
    var params = req.params;
    var id = params.id;
    var data = req.body;

    Post.findById(id).exec().then(function (post) {
        post.title = data.title;
        post.content = data.content;
        post.save().then(function () {
            res.redirect('/');
        }, next);
    }, next);
});

module.exports = router;
