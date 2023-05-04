import * as vs from 'vscode';

export function activate(context: vs.ExtensionContext) {
	console.log('Congratulations, your extension "formatonactivitybar" is now active!');

	let disposable = vs.commands.registerCommand('formatonactivitybar.formatonsave', () => {
		let config = vs.workspace.getConfiguration();
		let configJSON = JSON.parse(JSON.stringify(config));
		const editorSettings = configJSON.editor;

		if (vs.workspace.getConfiguration().get("editor.formatOnSave")) {
			vs.workspace.getConfiguration().update("editor.formatOnSave", false, true);
			vs.window.showInformationMessage('Format on save has been [Disabled].');
		}
		else {
			vs.workspace.getConfiguration().update("editor.formatOnSave", true, true);
			vs.window.showInformationMessage('Format on save has been [Enabled].');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
