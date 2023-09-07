// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';


let minPosition = 0;
let maxPosition = 0;
let currentPosition = 0;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let moveToPosition = vscode.commands.registerCommand('extension.binarySearchNavigate', (direction: string) => {
		// The code you place here will be executed every time your command is executed
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const lineContent = editor.document.lineAt(editor.selection.active.line).text;

			if (direction === 'right') {
                minPosition = currentPosition;
                currentPosition = Math.floor((maxPosition + minPosition) / 2);
            } else if (direction === 'left') {
                maxPosition = currentPosition;
                currentPosition = Math.floor((minPosition + maxPosition) / 2);
            } else {
				minPosition = 0;
                maxPosition = lineContent.length;
                currentPosition = Math.floor((minPosition + maxPosition) / 2);
			}

            const newCursorPosition = new vscode.Position(editor.selection.active.line, currentPosition);
            editor.selection = new vscode.Selection(newCursorPosition, newCursorPosition);
        }
    });

    context.subscriptions.push(moveToPosition);
}

// This method is called when your extension is deactivated
export function deactivate() {}
