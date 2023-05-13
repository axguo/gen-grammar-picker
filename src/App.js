import React, { useState } from 'react';
import './App.css';


const App = () => {
  const [phrases, setPhrases] = useState([]);
  const [selectedPhrases, setSelectedPhrases] = useState([]);
  let RiTa = require("rita");

  const generatePhrases = () => {
    let newPhrases = [];
    for (let i = 0; i < 10; i++) {
      const grammar = {
        "start": "what if $phrase [3] | $s4 | $s5",
        "phrase": "$s1 | $s2 | $s3 ",
        "s1": "$per-pro loved $poss-pro $adj $nn",
        "s2": "we met at the $adj-phrase $nn",
        "s3": "things were $adj-phrase",
        "s4": "a $adj question",
        "s5": "loving in $adv $vbg ways",
        "adj-phrase": "$adj | $adj-comp | the $adj-sup | $adv $adj",
        "adv": RiTa.randomWord({ pos: "rb" }),
        "vb": RiTa.randomWord({ pos: "vb" }),
        "vbg": RiTa.randomWord({ pos: "vbg" }),
        "vbn": RiTa.randomWord({ pos: "vbn" }),
        "vbz": RiTa.randomWord({ pos: "vbz" }),
        "nns": RiTa.randomWord({ pos: "nns" }),
        "nn": RiTa.randomWord({ pos: "nn" }),
        "adj": RiTa.randomWord({ pos: "jj" }),
        "adj-comp": RiTa.randomWord({ pos: "jjr" }),
        "adj-sup": RiTa.randomWord({ pos: "jjs" }),
        "prep": RiTa.randomWord({ pos: "in" }),
        "dt": RiTa.randomWord({ pos: "dt" }),
        "poss-pro": "my | your | our | their | his | her | its",
        "per-pro": "you | I | we",
        "det": "another | some | that | this | every | each"
      };
      let rg = new RiTa.RiGrammar(grammar);
      let phrase = rg.expand();
      newPhrases.push(phrase);
    }
    setPhrases(newPhrases);
  };

  const togglePhraseSelection = (phrase) => {
    if (selectedPhrases.includes(phrase)) {
      setSelectedPhrases((prev) => prev.filter((item) => item !== phrase));
    } else {
      setSelectedPhrases((prev) => [...prev, phrase]);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedPhrases));
  };

  return (
    <div className={"app"}>
      <button  onClick={generatePhrases}>
        Generate Phrases
      </button>
      <ul>
        {phrases.map((phrase, i) => (
          <li key={i}>
            <button
              className={selectedPhrases.includes(phrase) ? "activeItem" : "listItem"}
              onClick={() => togglePhraseSelection(phrase)}
            >
              {phrase}
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Selected Phrases [{selectedPhrases.length}]:</h3>
        <p>{JSON.stringify(selectedPhrases)}</p>
      </div>
      <button onClick={copyToClipboard}>
        Copy to Clipboard
      </button>
    </div>
  );
};

export default App;