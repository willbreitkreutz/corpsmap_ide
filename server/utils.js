const slugs = require('slugs');
const projectController = require('./controllers/project-controller');

module.exports.slugify = async function(str){
  const slug = slugs(str);
  const likeSlugs = await projectController.selectLikeSlugs(slug);
  if(likeSlugs.length){
    return `${slug}-${likeSlugs.length + 1}`;
  }
  return slug;
}