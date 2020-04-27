import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import JSONTree from './component';
import './App.scss';

function App() {
  const [jsonFile, setJsonFile] = useState({});
  const [isSubmit, setSumbit] = useState(false);
  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    setJsonFile(JSON.parse(event.target.result));
  }

  const onChangeJson = (event) => {
    fileReader.readAsText(event.target.files[0]);
  }

  const setSubmitForm = (event) => {
    event.preventDefault();
    if (!isSubmit)
      setSumbit(true);
  }

  return (
    <div className="app" >
      <div className="container">
        <h1> Please insert you JSON:</h1>
        <form onSubmit={setSubmitForm}>
          <Input type="file" onChange={onChangeJson} />
          <Button variant="contained" color="primary" type="submit">
            Form json tree
          </Button>
        </form>
        {isSubmit && <JSONTree data={jsonFile} />}
      </div>
    </div>
  );
}

export default React.memo(App);