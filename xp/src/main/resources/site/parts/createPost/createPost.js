var portal = require('/lib/xp/portal');
var thymeleaf = require('/lib/thymeleaf');
var content = require('/lib/xp/content');

const getCategories = function () {
    return content.query({
        start: 0,
        count: -1,
        contentTypes: [`${app.name}:category`]
    }).hits.map((category) => {
        return {id: category._id, title: category.data.title}
    }).sort((a, b) => a.title.localeCompare(b.title));
}

const getAuthors = function () {
    return content.query({
        start: 0,
        count: -1,
        contentTypes: [`${app.name}:author`]
    }).hits.map((author) => {
        return {id: author['_id'], name: author.data.fullname}
    }).sort((a, b) => a.name.localeCompare(b.name));
}

exports.get = function (req) {
    var currentContent = portal.getContent();
    const categories = getCategories();
    const authors = getAuthors();

    var view = resolve('createPost.html');

    var model = {
        data: {
            authors, categories
        },
        config: {
            postsFolderPath: '/bootstrap-starter/posts'
        },
        serviceUrl: portal.serviceUrl({service: 'crudPost'})
    }

    return {
        body: thymeleaf.render(view, model)
    }
}