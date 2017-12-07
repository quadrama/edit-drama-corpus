'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'edit-drama-corpus:insert_rs': () => this.insert_rs()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      editDramaCorpusViewState: this.editDramaCorpusView.serialize()
    };
  },

  insert_rs() {
    console.log("insert_rs");
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      const selection = editor.getSelectedText();
      console.log(selection);
      editor.insertText('<rs ref="">'+selection+'</rs>');
      editor.moveLeft(7+selection.length);
    }
    return true;
  }

};
