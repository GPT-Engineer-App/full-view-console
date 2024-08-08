import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Welcome to the Terminal. Type "help" for a list of commands.']);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [output]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    setOutput([...output, `$ ${trimmedInput}`]);

    switch (trimmedInput.toLowerCase()) {
      case 'help':
        setOutput(prev => [...prev, 'Available commands: help, clear, date, echo <message>']);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'date':
        setOutput(prev => [...prev, new Date().toString()]);
        break;
      default:
        if (trimmedInput.toLowerCase().startsWith('echo ')) {
          setOutput(prev => [...prev, trimmedInput.slice(5)]);
        } else {
          setOutput(prev => [...prev, `Command not found: ${trimmedInput}`]);
        }
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-green-400 font-mono p-4">
      <div ref={outputRef} className="flex-1 overflow-y-auto mb-4">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <span className="mr-2">$</span>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 bg-transparent border-none text-green-400 focus:outline-none"
        />
      </form>
    </div>
  );
};

export default Terminal;
