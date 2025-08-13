// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Emitter;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_upload::init())
        // .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_clipboard::init()) // add this line
        .plugin(tauri_plugin_clipboard_manager::init())
        .setup(|app| {
            #[cfg(desktop)]
            let _ = app.handle().plugin(tauri_plugin_autostart::init(
                tauri_plugin_autostart::MacosLauncher::LaunchAgent,
                Some(vec!["--flag1", "--flag2"]), /* arbitrary number of args to pass to your app */
            ));
            {
                use tauri_plugin_global_shortcut::{
                    Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState,
                };
                print!("223233223");
                let ctrl_n_shortcut = Shortcut::new(Some(Modifiers::ALT), Code::KeyT);
                app.handle().plugin(
                    tauri_plugin_global_shortcut::Builder::new()
                        .with_handler(move |app, shortcut, event| {
                            println!("{:?}", shortcut);
                            if event.state == ShortcutState::Pressed {
                                if shortcut.matches(Modifiers::ALT, Code::KeyT) {
                                    let _ = app.emit("add-images", ShortcutState::Pressed);
                                }
                                if shortcut.matches(Modifiers::ALT, Code::KeyR) {
                                    let _ = app.emit("add-go-images", "ALT+1 triggered");
                                }
                            }
                        })
                        .build(),
                )?;

                app.global_shortcut().register(ctrl_n_shortcut)?;
            }

            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
