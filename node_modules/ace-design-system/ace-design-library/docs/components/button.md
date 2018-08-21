# Button
The API documentation of the Button React component.


### Demos

<div class="buttons demo">
    <button class="idle">Idle</button>
    <button class="active">Active</button>
    <button class="deactive">Inactive</button>    
</div>

### Props
| Name    | Type     | Default | Description                                                                                |   |
|---------|----------|---------|--------------------------------------------------------------------------------------------|---|
| `active`  | string   |         | Used to update button state. If `active` is set to false, `onClick` prop will be disabled. |   |
| `label`   | string   | button  | Display on button component [passed to ButtonLabel child component as label prop].         |   |
| `onClick` | function |         | Function called when button is clicked.  

!!! note ""
    Any other properties supplied will be spread to the root element (native element).



### CSS API

<br/>