import { composeBundles } from 'redux-bundler'
import projectBundle from './project-bundle';
import editorBundle from './editor-bundle';
import viewBundle from './view-bundle';
import modalBundle from './modal-bundle';
import apiBundle from './api-bundle';

export default composeBundles(
  apiBundle,
  projectBundle,
  editorBundle,
  viewBundle,
  modalBundle
)