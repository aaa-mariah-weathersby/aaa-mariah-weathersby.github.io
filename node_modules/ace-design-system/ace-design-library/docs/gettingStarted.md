# Getting Started

For full documentation visit the official [github repo](https://github.com/clublabs/ACEDesignSystem).

**Mac:** If you are on a mac run all the following commands in the terminal

**Windows:** If you are on a windows machine, run all the following commands in the Node.js terminal. If you do not have the node terminal install, [please see to install](http://blog.teamtreehouse.com/install-node-js-npm-windows)
<hr/>


## npm/node
#### Installation

1. Navigate to the root directory of your project `cd <project-root>`
2. In your project, create an .npmrc file and add the following
       
```
registry=http://ace-lahq-nexus-alb-769347001.us-west-1.elb.amazonaws.com/repository/aaa-npm-private-hosted/
email=hang.david@clublabs.com
always-auth=false
_auth=YWRtaW46YWRtaW4xMjM0
```


3. Install the Ace Design Library `npm install ace-design-system --save`

    !!! note ""
        this will create an entry in **package.json** for `ace-design-system": "1.X.X`


<hr/>

#### Usage

4. In your react js files, import the `ace-design-system` package and associative components 

```javascript
import { Button } from `ace-design-system'

....
<Button />
```

<br/>


