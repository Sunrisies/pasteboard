"use client"
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { enable, isEnabled, disable } from '@tauri-apps/plugin-autostart';
import { writeText, readText, readImage } from '@tauri-apps/plugin-clipboard-manager';
function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [image, setImage] = useState("")
  const [name, setName] = useState("");
  // Enable autostart
  const init = async () => {
    const als = await enable();
    const as = await isEnabled()
    console.log(als, '1=1=1=', as)
    // Check enable state
    console.log(`registered for autostart? ${await isEnabled()}`);
    // Disable autostart
    // await disable();
  }
  init()

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }
  const copyToClipboard = async () => {
    const image = await readImage()
    const blob = new Blob([await image.rgba()], { type: 'image' })
    const url = URL.createObjectURL(blob)
    console.log(url)
    // const ss = url.slice(5)
    setImage(() => url)
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
          {image && image}
        </a>
      </div>
      {image && <img src={image} alt="从剪贴板复制的图片" />}

      <button onClick={copyToClipboard}>
        复制图片到剪贴板
      </button>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
