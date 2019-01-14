import { composeBundles } from 'redux-bundler'
import projectBundle from './project-bundle';
import fileBundle from './file-bundle';
import viewBundle from './view-bundle';

export default composeBundles(
  projectBundle,
  fileBundle,
  viewBundle
)