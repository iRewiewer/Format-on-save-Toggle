import { start } from 'repl';
import * as vs from 'vscode';

let app: vs.StatusBarItem;
let startupText = vs.workspace.getConfiguration().get("editor.formatOnSave") ? 'FoS: Enabled' : 'FoS: Disabled';

export function activate({ subscriptions }: vs.ExtensionContext) {
	console.log('Started correctly.');

	const commandId = "formatonsave.toggle";
	subscriptions.push(vs.commands.registerCommand(commandId, () => {
		if (vs.workspace.getConfiguration().get("editor.formatOnSave")) {
			vs.workspace.getConfiguration().update("editor.formatOnSave", false, true);
			vs.window.showInformationMessage('Format on save has been Disabled.');
			app.text = 'FoS: Disabled';
		}
		else {
			vs.workspace.getConfiguration().update("editor.formatOnSave", true, true);
			vs.window.showInformationMessage('Format on save has been Enabled.');
			app.text = 'FoS: Enabled';
		}
	}));

	app = vs.window.createStatusBarItem(vs.StatusBarAlignment.Right);
	app.command = commandId;
	app.text = startupText;
	app.show();
	subscriptions.push(app);
}

export function deactivate() { }
