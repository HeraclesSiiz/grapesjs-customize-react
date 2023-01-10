import React, { useEffect } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import grapesjs from 'grapesjs';
import plugin from 'grapesjs-preset-webpage';
import basic from 'grapesjs-blocks-basic';
import forms from 'grapesjs-plugin-forms';
import pgexport from 'grapesjs-plugin-export';
import navbar from 'grapesjs-navbar';
import countdown from 'grapesjs-component-countdown';

import 'grapesjs/dist/css/grapes.min.css';
import './grapes.css';
import './index.scss';
import 'semantic-ui-css/semantic.min.css';

const svgNameList = ['column', '2columns', '3columns', '2col37', 'text', 'link', 'image', 'video', 'map', 'linkblock', 'quote', 'textsection', 'form','form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio', 'navbar', 'countdown'
];

const panelList = [];
panelList[1] = ['ti ti-device-desktop', 'ti ti-device-tablet', 'ti ti-device-mobile'];
panelList[0] = [];
panelList[2] = ['ti ti-marquee-2', '', 'ti ti-arrows-maximize', 'ti ti-code', '', '', 'ti ti-file-import', 'ti ti-eraser'];
panelList[3] = ['ti ti-pencil', 'ti ti-settings', 'ti ti-layers-subtract', 'ti ti-layout-grid','ti ti-puzzle'];

export default function Buidler(props) {
    const [editor, setEditor] = React.useState(null);
    const [zIndex, setIndex] = React.useState(4);

    useEffect(() => {
        let editor = grapesjs.init({
            fromElement: true,
            container: '#gjs',
            storageManager: {
                type: 'local',
                autoload: true,
                autosave: true,
                stepsBeforeSave: 1,
                storeComponents: true,
                storeStyles: true,
                storeHtml: true,
                storeCss: true,
            },
            plugins: [
                basic, plugin, forms, navbar, countdown, pgexport
            ],
            pluginsOpts: {
                [forms]:{
                    blocks:[ 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio']
                },
                [pgexport]: {
                    addExportBtn: true,
                    btnLabel: 'export',
                    css: {
                        'style.css': ed => ed.getCss(),
                        'some-file.txt': 'My custom content',
                    },
                    img: async ed => {
                        const images = await ed.getComponents();
                        return images;
                    },
                    'index.html': ed => `<body>${ed.getHtml()}</body>`
                },
            },
            canvas: {
                styles:['https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i|Open+Sans:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Lato:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Montserrat:300,300i,400,400i,500,500i,700,700i,800,80i,900,900i|Oswald:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Source+Sans+Pro:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Slabo+27px/13px:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Raleway:400,400i,600,600i,700,700i,800,800i,900,900i|Poppins:400,400i,600,600i,700,700i,800,800i,900,900i|Josefin+Sans:100,100i,200,200i,300.300i.400,400i,600,600i,700,700i,800,800i,900,900i|Nunito:100,100i,200,200i,300.300i.400,400i,600,600i,700,700i,800,800i,900,900i&subset=latin,latin-ext']
            }
        });

        const styleManager = editor.StyleManager;

        const fontManager = styleManager.getProperty('typography', 'font-family');
        let fontOptions = fontManager.attributes.options;
        //add typography fonts
        fontOptions.push({ value: 'Roboto, Arial', name: 'Roboto' });
        fontOptions.push({ value: 'Open Sans', name: 'Open Sans' });
        fontOptions.push({ value: 'Lato', name: 'Lato' });
        fontOptions.push({ value: 'Montserrat', name: 'Montserrat' });
        fontOptions.push({ value: 'Oswald', name: 'Oswald' });
        fontOptions.push({ value: 'Source Sans Pro', name: 'Source Sans Pro' });
        fontOptions.push({ value: 'Slabo', name: 'Slabo' });
        fontOptions.push({ value: 'Raleway', name: 'Raleway' });
        fontOptions.push({ value: 'Poppins', name: 'Poppins' });
        fontOptions.push({ value: 'Josefin Sans', name: 'Josefin Sans' });
        fontOptions.push({ value: 'Nunito', name: 'Nunito' });
        fontManager.set('list',fontOptions);

        styleManager.removeProperty('dimension', 'width');
        styleManager.removeProperty('dimension', 'height');
        styleManager.removeProperty('dimension', 'margin');
        styleManager.removeProperty('dimension', 'padding');

        styleManager.addProperty('dimension', {
            label: 'Width',
            property: 'width',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 2000,
          }, { at: 0 });

        styleManager.addProperty('dimension', {
            label: 'Height',
            property: 'height',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 2000,
        }, { at: 1 });

        styleManager.addProperty('dimension', {
            label: 'margin top',
            property: 'margin-top',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 200,
          }, { at: 4 });

        styleManager.addProperty('dimension', {
            label: 'margin right',
            property: 'margin-right',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 200,
        }, { at: 5 });
        
        styleManager.addProperty('dimension', {
            label: 'margin bottom',
            property: 'margin-bottom',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 200,
        }, { at: 6 });
        
        styleManager.addProperty('dimension', {
            label: 'margin left',
            property: 'margin-left',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 200,
        }, { at: 7 });

        styleManager.addProperty('dimension', {
            label: 'padding top',
            property: 'padding-top',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 200,
          }, { at: 8 });

        styleManager.addProperty('dimension', {
            label: 'padding right',
            property: 'padding-right',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 200,
        }, { at: 9 });
        
        styleManager.addProperty('dimension', {
            label: 'padding bottom',
            property: 'padding-bottom',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 200,
        }, { at: 10 });
        
        styleManager.addProperty('dimension', {
            label: 'padding left',
            property: 'padding-left',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 200,
        }, { at: 11 });
          
        styleManager.render();

        const panelManager = editor.Panels;
        const blockManager = editor.Blocks;

        let panels = panelManager.getPanels();
          
        panelManager.addButton('views', {
            id: 'open-html-blocks',
            attributes: {title: "html blocks"},
            active: false,
            command: {
                run: function (editor) {
                    blockManager.add('header', {
                        label: 'Header',
                        content: 
                        `<header>
                            <div class="header">
                            <h1>Header</h1>
                            <p>My supercool header</p>
                            </div>
                            
                            <div class="content">
                            <h1>Content</h1>
                            <p>Some content blablabla, some content blablabla.</p>
                            <p>Some content blablabla, some content blablabla.</p>
                            <p>Some content blablabla, some content blablabla.</p>
                            </div>
                        </header>

                        <style>
                        
                        /* Header/Logo Title */
                        .header {
                        padding: 60px;
                        text-align: center;
                        background: #1abc9c;
                        color: white;
                        font-size: 30px;
                        }
                        
                        /* Page Content */
                        .content {padding:20px;}
                        </style>`,
                        category: 'html',
                        type:'header',
                        media:'<img src = "header.png">',
                        attributes: {
                        title: 'Insert h1 block'
                        }
                    });
                    
                    blockManager.add('blog', {
                        label: 'Blog',
                        content: 
                        `<div>
                            <div class="header">
                            <h2>Blog Name</h2>
                            </div>
                            
                            <div class="row">
                            <div class="leftcolumn">
                                <div class="card">
                                <h2>TITLE HEADING</h2>
                                <h5>Title description, Dec 7, 2017</h5>
                                <div class="fakeimg" style="height:200px;">Image</div>
                                <p>Some text..</p>
                                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                                </div>
                                <div class="card">
                                <h2>TITLE HEADING</h2>
                                <h5>Title description, Sep 2, 2017</h5>
                                <div class="fakeimg" style="height:200px;">Image</div>
                                <p>Some text..</p>
                                <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                                </div>
                            </div>
                            <div class="rightcolumn">
                                <div class="card">
                                <h2>About Me</h2>
                                <div class="fakeimg" style="height:100px;">Image</div>
                                <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                                </div>
                                <div class="card">
                                <h3>Popular Post</h3>
                                <div class="fakeimg">Image</div><br>
                                <div class="fakeimg">Image</div><br>
                                <div class="fakeimg">Image</div>
                                </div>
                                <div class="card">
                                <h3>Follow Me</h3>
                                <p>Some text..</p>
                                </div>
                            </div>
                            </div>
                            
                            <div class="footer">
                            <h2>Footer</h2>
                            </div>
                        </div>
                        <style>
                        /* Header/Blog Title */
                        .header {
                          padding: 30px;
                          font-size: 40px;
                          text-align: center;
                          background: white;
                        }
                        
                        /* Create two unequal columns that floats next to each other */
                        /* Left column */
                        .leftcolumn {   
                          float: left;
                          width: 75%;
                        }
                        
                        /* Right column */
                        .rightcolumn {
                          float: left;
                          width: 25%;
                          padding-left: 20px;
                        }
                        
                        /* Fake image */
                        .fakeimg {
                          background-color: #aaa;
                          width: 100%;
                          padding: 20px;
                        }
                        
                        /* Add a card effect for articles */
                        .card {
                           background-color: white;
                           padding: 20px;
                           margin-top: 20px;
                        }
                        
                        /* Clear floats after the columns */
                        .row:after {
                          content: "";
                          display: table;
                          clear: both;
                        }
                        
                        /* Footer */
                        .footer {
                          padding: 20px;
                          text-align: center;
                          background: #ddd;
                          margin-top: 20px;
                        }
                        
                        /* Responsive layout - when the screen is less than 800px wide, make the two columns stack on top of each other instead of next to each other */
                        @media screen and (max-width: 800px) {
                          .leftcolumn, .rightcolumn {   
                            width: 100%;
                            padding: 0;
                          }
                        }
                        </style>`,
                        category: 'html',
                        media:'<img src = "blog.jpg">',
                        attributes: {
                            title: 'Insert h3 block',
                        }
                    });

                    blockManager.render( blocks.filter((block) => { 
                        if (block.attributes.category.attributes.label === 'html') {
                            return true; 
                        } 
                    }));
                    const html_blocks = document.querySelectorAll('.gjs-block');
                    for(var html_block of html_blocks){
                        html_block.style.width = "90%";
                    }

                    editor.runCommand('open-blocks');
                },
                stop: function (editor) {
                    blockManager.render( blocks.filter((block) => {
                        if (block.attributes.category.attributes.label !== 'html') {
                            return true; 
                        } 
                    }));
                    const openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
                    openBlocksBtn.set('active', 0);
                }
            }
        });

        panels.map((panel, index) => {
            panel.buttons.models.map((button, pindex) => {
                button.set('label', '');
                button.set('className', panelList[index][pindex]);
            })
            panels[index] = panel;
        });

        blockManager.add('lead_generation', {
            label: 'Lead Generation',
            category: 'forms',
            content: 
                `<form method='get' action='/'>
                    <input type='text' placeholder='Name' name='form_name' class='form_name'>
                    <input type='email' placeholder='Email' name='form_email' class='form_email'>
                    <input type='submit' value='Sign Up' name='form_sign' class='form_sign'>
                </form>
                <style>
                    input {
                        width:100%;
                        height:35px;
                        margin-bottom:0.3em;
                    }
                    .form_name,.form_email{
                        backgrond-color:#ccc;
                    }
                    .form_sign{
                        background-color:Aqua;
                    }
                </style>
                `
          }, { at: 12 });

        blockManager.add('contact_form', {
        label: 'Contact Form',
        category: 'forms',
        content: 
            `<form method='get' action='/'>
                <input type='text' placeholder='Name' name='form_name' class='form_name'>
                <input type='email' placeholder='Email' name='form_email' class='form_email'>
                <input type='textarea' placeholder='Message' name='form_message' class='form_message'>
                <input type='submit' value='Send Message' name='form_send' class='form_send'>
            </form>
            <style>
                input {
                    width:100%;
                    height:35px;
                    margin-bottom:0.3em;
                }
                input[type='textarea'] {
                    height:120px;
                }
                .form_name,.form_email{
                    backgrond-color:#ccc;
                }
                .form_send{
                    background-color:Aqua;
                }
            </style>
            `,
        }, { at: 13 });

        let blocks = blockManager.getAll();
        blocks.map((block, index) => {
            block.attributes.media = '<img src = "buildericons/' + svgNameList[index] + '.svg">';
            switch(block.attributes.label){
                case '1 Column':
                    block.attributes.content =
                    `<div class='gjs-row' data-gjs-droppable='.gjs-cell' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name='Row'>
                        <div  class='gjs-cell' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                    </div>
                    <style>  
                        .gjs-row {
                            display: flex;
                            justify-content: flex-start;
                            align-items: stretch;
                            flex-wrap: nowrap;
                            padding: 10px;
                        }
                        .gjs-cell {
                            min-height: 75px;
                            flex-grow: 1;
                            flex-basis: 100%;
                        }
                        
                        @media (max-width: 768px) {
                            .gjs-cell, .gjs-cell30, .gjs-cell70 {
                                width: 100%;
                                display: block;
                            }
                        }
                                            
                        .gjs-row:empty:not(:focus)  {
                            background-image: url("plus.png");
                            background-repeat: no-repeat;
                            background-position: center;
                            background-color:#555;
                            border:1px solid #ddd;
                        }
                        .gjs-cell:empty:not(:focus)  {
                            background-image: url("plus.png");
                            background-repeat: no-repeat;
                            background-position: center;
                            background-color:#888;
                            border:1px solid #eee;
                        }
                    </style>`;
                    break;
                case '2 Columns':
                    block.attributes.content = 
                        `<div  class='gjs-row' data-gjs-droppable='.gjs-cell' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name='Row'>
                            <div  class='gjs-cell' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                            <div  class='gjs-cell' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                        </div>
                        <style>
                        .gjs-row {
                            display: flex;
                            justify-content: flex-start;
                            align-items: stretch;
                            flex-wrap: nowrap;
                            padding: 10px;
                        }
                        .gjs-cell {
                            min-height: 75px;
                            flex-grow: 1;
                            flex-basis: 100%;
                        }
                        @media (max-width: 768px) {
                            .gjs-cell, .gjs-cell30, .gjs-cell70 {
                                width: 100%;
                                display: block;
                            }
                        }
                                            
                        .gjs-row:empty:not(:focus)  {
                            background-image: url("plus.png");
                            background-repeat: no-repeat;
                            background-position: center;
                            background-color:#555;
                            border:1px solid #ddd;
                        }
                        .gjs-cell:empty:not(:focus)  {
                            background-image: url("plus.png");
                            background-repeat: no-repeat;
                            background-position: center;
                            background-color:#888;
                            border:1px solid #eee;
                        }
                        </style>`;
                    break;
                case '3 Columns':
                    block.attributes.content = 
                    `<div  class='gjs-row' data-gjs-droppable='.gjs-cell' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name='Row'>
                        <div  class='gjs-cell' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                        <div  class='gjs-cell' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                        <div  class='gjs-cell' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                    </div>
                    <style>
                    .gjs-row {
                        display: flex;
                        justify-content: flex-start;
                        align-items: stretch;
                        flex-wrap: nowrap;
                        padding: 10px;
                    }
                    .gjs-cell {
                        min-height: 75px;
                        flex-grow: 1;
                        flex-basis: 100%;
                    }
                    @media (max-width: 768px) {
                        .gjs-cell, .gjs-cell30, .gjs-cell70 {
                            width: 100%;
                            display: block;
                        }
                    }
                                            
                    .gjs-row:empty:not(:focus)  {
                        background-image: url("plus.png");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-color:#555;
                        border:1px solid #ddd;
                    }
                    .gjs-cell:empty:not(:focus)  {
                        background-image: url("plus.png");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-color:#888;
                        border:1px solid #eee;
                    }
                    </style>`;
                    break;
                case '2 Columns 3/7':
                    block.attributes.content = 
                    `<div  class='gjs-row' data-gjs-droppable='.gjs-cell' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name='Row'>
                        <div  class='gjs-cell30' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                        <div  class='gjs-cell70' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                    </div>
                    <style>
                    .gjs-row {
                        display: flex;
                        justify-content: flex-start;
                        align-items: stretch;
                        flex-wrap: nowrap;
                        padding: 10px;
                    }
                    .gjs-cell30 {
                        min-height: 75px;
                        flex-grow: 1;
                        flex-basis: 30%;
                    }
                    .gjs-cell70 {
                        min-height: 75px;
                        flex-grow: 1;
                        flex-basis: 70%;
                    }
                    @media (max-width: 768px) {
                        .gjs-cell, .gjs-cell30, .gjs-cell70 {
                            width: 100%;
                            display: block;
                        }
                    }
                                            
                    .gjs-row:empty:not(:focus)  {
                        background-image: url("plus.png");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-color:#555;
                        border:1px solid #ddd;
                    }
                    .gjs-cell30:empty:not(:focus),.gjs-cell70:empty:not(:focus)  {
                        background-image: url("plus.png");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-color:#888;
                        border:1px solid #eee;
                    }
                    </style>`
                    break;
                case 'Image':
                    block.attributes.content.style = {
                        color:'black',
                        'max-width':'100%'
                    };
            }
            blocks[index] = block;
        });

        editor.on('component:selected', () => {
            const selected = editor.getSelected();
            const openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
            if (selected.attributes.name == "Row" || selected.attributes.name == "Cell") {
                if(!openBlocksBtn || !openBlocksBtn.get('active')){
                    openBlocksBtn && openBlocksBtn.set('active', 1);
                }
            }
        });
        //     isComponent: el => el.tagName == 'FORM',
        //     model: {
        //         init() {
        //         },
        //         defaults: {
        //             traits: [{
        //                 type: 'checkbox',
        //                 name: 'global',
        //                 label: 'Global',
        //             }],
        //         },
        //     },
        //     view: {
        //         init() {
        //             this.listenTo(this.model, 'change:attributes:global', this.changeGlobal);
        //         },
        //         changeGlobal() {
        //             const component = editor.getSelected();
        //             const properties = this.model.attributes.attributes;
        //             const state = properties.global;
        //             const content = component.toHTML();
        //             console.log(state,content);
        //             if(properties.global){
                        
        //             }
        //         },
        //         onRender() {
        //         }
        //     }
        // });

        // editor.DomComponents.addType('header', {
        //     isComponent: el => el.tagName == 'header',
        //     model: {
        //         init() {
        //         },
        //         defaults: {
        //             tagName:'header',
        //             traits: [{
        //                 type: 'checkbox',
        //                 name: 'global',
        //                 label: 'Global',
        //             }],
        //         },
        //     },
        //     view: {
        //         init() {
        //             this.listenTo(this.model, 'change:attributes:global', this.changeGlobal);
        //         },
        //         changeGlobal() {
        //             const component = editor.getSelected();
        //             const properties = this.model.attributes.attributes;
        //             const state = properties.global;
        //             const content = component.toHTML();
        //             console.log(state,content);
        //             if(properties.global){
                        
        //             }
        //         },
        //         onRender() {
        //         }
        //     }
        // });

        // editor.DomComponents.addType('footer', {
        //     isComponent: el => el.tagName == 'FOOTER',
        //     model: {
        //         init() {
        //         },
        //         defaults: {
        //             traits: [{
        //                 type: 'checkbox',
        //                 name: 'global',
        //                 label: 'Global',
        //             }],
        //         },
        //     },
        //     view: {
        //         init() {
        //             this.listenTo(this.model, 'change:attributes:global', this.changeGlobal);
        //         },
        //         changeGlobal() {
        //             const component = editor.getSelected();
        //             const properties = this.model.attributes.attributes;
        //             const state = properties.global;
        //             const content = component.toHTML();
        //             console.log(state,content);
        //             if(properties.global){
                        
        //             }
        //         },
        //         onRender() {
        //         }
        //     }
        // });

        const undoManager = editor.UndoManager
        undoManager.start();

        editor.on('run:preview', () => {
            setIndex(1);
        });
        editor.on('stop:preview', () => {
            setIndex(4);
        });
        
        editor.load();
        editor.Commands.stop('open-html-blocks');

        setEditor(editor);
      }, []);

    const setPreview = (run) => {
        const commandManager = editor.Commands
        if (run == true) {
            commandManager.get('preview').run(editor)
            setIndex(1);
        } else {
            commandManager.get('preview').stop(editor)
            setIndex(4);
        }
    }

    const undo = () => {
        const undoManager = editor.UndoManager
        if (undoManager.hasUndo()) {
            undoManager.undo();
        }
    }

    const redo = () => {
        const undoManager = editor.UndoManager
        if (undoManager.hasRedo()) {
            undoManager.redo();
        }
    }

    // const export = () => {
    //     editor.runCommand('gjs-export-zip');
    // }

    return (
        <>
            <Button.Group className='control demo' style={{ zIndex: zIndex }}>
                <Button onClick={() => setPreview(true)} className="page_preview">Preview</Button>
                <Button  color="blue" className="page_save">Save</Button>
            </Button.Group>
            <Icon onClick={() => setPreview(false)} style={{ zIndex: 5 - zIndex }} name="eye slash" size='big' className="page_preview"></Icon>
            <Button.Group className='control history' style={{ zIndex: zIndex }}>
                <Button onClick={() => undo()} icon="undo" className="page_undo"></Button>
                <Button onClick={() => redo()} icon="redo" className="page_redo"></Button>
            </Button.Group>
            <div id="gjs">
            </div>
        </>
    );
}