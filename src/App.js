import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleMakeChange = (event) => {
    setMake(event.target.value);
  };

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let text = `I have a ${make} ${model} and the color is ${color}.`;

    if (color === 'RED') {
      text += ' THE CAR IS RED! NICE!!';
    }

    setGeneratedText(text);
  };

  useEffect(() => {
    const canvas = document.getElementById('Matrix');
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana =
      'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const animationId = setInterval(draw, 30);

    return () => {
      clearInterval(animationId);
    };
  }, []);

  return (
    <div className="container">
      <canvas id="Matrix"></canvas>

      <div className="content">
        <h1>Car Selection</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="make">Make:</label>
            <select id="make" value={make} onChange={handleMakeChange} required>
              <option value="">Select Make</option>
              <option value="AUDI">AUDI</option>
              <option value="BMW">BMW</option>
              <option value="VAUXHAL">VAUXHAL</option>
              <option value="MERCEDES">MERCEDES</option>
              <option value="PEUGEOT">PEUGEOT</option>
              <option value="RENAULT">RENAULT</option>
            </select>
          </div>
  
        <div className="form-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={handleModelChange}
              placeholder="Enter Model"
              required
            />
          </div>
                
          <div className="form-group">
            <label htmlFor="color">Color:</label>
            <select id="color" value={color} onChange={handleColorChange} required>
              <option value="">Select Color</option>
              <option value="BLUE">BLUE</option>
              <option value="RED">RED</option>
              <option value="BLACK">BLACK</option>
              <option value="ORANGE">ORANGE</option>
            </select>
          </div>
          <button type="submit">Generate Text</button>
        </form>
        {generatedText && <p className="generated-text">{generatedText}</p>}
      </div>
    </div>
  );
};

export default App;
