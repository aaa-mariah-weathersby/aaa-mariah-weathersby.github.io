# Input
The API documentation of the Input React component.

### Demos
<div class="demo">
    <form class="demo_input">
        <input type="text">
        <label>Input Field</label> 
    </form>
</div>

### Props
| Name     | Type     | Default | Description                                                                                                                                                |   |
|----------|----------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------|---|
| `name`     | string   |         | Name attribute assigned to the root input element.                                                                                                         |   |
| `callback` | function |         | Optional callback function to be called onChange. <br/>Passes input state as argument.                                                                          |   |
| `label`    | string   | button  | Display on input component [passed to InputLabelMUI child component].                                                                                      |   |
| `type`     | string   | text    | Type attribute assigned to the root input element. <br/>Property to define the expected input for the field [dictates keyboard recognition on native platforms]. |   |

!!! note ""
    Any other properties supplied will be spread to the root element (native element).



### CSS API


<br/>