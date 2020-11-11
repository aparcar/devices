import {
    render
} from 'react-dom';
import Form from '@rjsf/bootstrap-4';

const yaml = require('js-yaml');

const onSubmit = ({
    formData
}, e) => {
    console.log(formData);
    //console.log(yaml.safeDump(formData || {}));
}

function App() {
    fetch("schema.json")
        .then(response => response.json())
        .then(schema => {
            render( <
                Form schema = {
                    schema
                }
                onChange = {
                    onSubmit
                }
                />,
                document.getElementById('root'));
        });
    return (
        <p> Loading schemas...</p>);
}

export default App;
