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
panelList[3] = ['ti ti-pencil', 'ti ti-settings', 'ti ti-layers-subtract', 'ti ti-layout-grid'];

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
            max: 100,
          }, { at: 4 });

        styleManager.addProperty('dimension', {
            label: 'margin right',
            property: 'margin-right',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 100,
        }, { at: 5 });
        
        styleManager.addProperty('dimension', {
            label: 'margin bottom',
            property: 'margin-bottom',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 100,
        }, { at: 6 });
        
        styleManager.addProperty('dimension', {
            label: 'margin left',
            property: 'margin-left',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 100,
        }, { at: 7 });

        styleManager.addProperty('dimension', {
            label: 'padding top',
            property: 'padding-top',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 100,
          }, { at: 8 });

        styleManager.addProperty('dimension', {
            label: 'padding right',
            property: 'padding-right',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 100,
        }, { at: 9 });
        
        styleManager.addProperty('dimension', {
            label: 'padding bottom',
            property: 'padding-bottom',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 100,
        }, { at: 10 });
        
        styleManager.addProperty('dimension', {
            label: 'padding left',
            property: 'padding-left',
            type: 'slider',
            units:['px','%','em','rem','vh','vw'],
            min: 0,
            max: 100,
        }, { at: 11 });
          
        styleManager.render();

        const panelManager = editor.Panels;
        let panels = panelManager.getPanels();

        panels.map((panel, index) => {
            panel.buttons.models.map((button, pindex) => {
                button.set('label', '');
                button.set('className', panelList[index][pindex]);
            })
            panels[index] = panel;
        });

        const blockManager = editor.Blocks;
        
        blockManager.add('lead_generation', {
            label: 'Lead Generation',
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
            console.log(block.attributes.content);
            
            switch(block.attributes.label){
                case '1 Column':                    
                    block.attributes.content =
                    `<div class='gjs-row' data-text='&#43;' data-gjs-droppable='.gjs-cell' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name='Row'>
                        <div  class='gjs-cell' data-text='&#43;' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                    </div>
                    <style>  
                        .gjs-row {
                            display: table;
                            padding: 10px;
                            width: 100%;
                        }
                        .gjs-cell {
                            width: 8%;
                            display: table-cell;
                            height: 75px;
                        }
                        
                        @media (max-width: 768px) {
                            .gjs-cell, .gjs-cell30, .gjs-cell70 {
                                width: 100%;
                                display: block;
                            }
                        }
                                            
                        .gjs-row:empty:not(:focus)  {
                            background-color:#555;
                            border:1px solid #ddd;
                        }
                        .gjs-cell:empty:not(:focus)  {
                            background-color:#888;
                            border:1px solid #eee;
                        }
                        .gjs-cell:empty:not(:focus)::before  {
                            content: attr(data-text);
                            position: relative;
                            background-color: #ccc;
                            padding: 0.3em 0.5em;
                            border-radius: 50%;
                            top: calc(50% - 0.5em);
                            left: calc(50% - 0.5em);
                        }
                        .gjs-row:empty:not(:focus)::before {
                            content: attr(data-text);
                            position: relative;
                            background-color: #ccc;
                            padding: 0.3em 0.5em;
                            border-radius: 50%;
                            top: calc(50% - 0.5em);
                            left: calc(50% - 0.5em);
                        }
                    </style>`;
                    break;
                case '2 Columns':
                    block.attributes.content = 
                        `<div  class='gjs-row' data-text='&#43;' data-gjs-droppable='.gjs-cell' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name='Row'>
                            <div  class='gjs-cell' data-text='&#43;' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                            <div  class='gjs-cell' data-text='&#43;' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                        </div>
                        <style>
                        .gjs-row {
                            display: table;
                            padding: 10px;
                            width: 100%;
                        }
                        .gjs-cell {
                            width: 8%;
                            display: table-cell;
                            height: 75px;
                        }
                        @media (max-width: 768px) {
                            .gjs-cell, .gjs-cell30, .gjs-cell70 {
                                width: 100%;
                                display: block;
                            }
                        }
                                            
                        .gjs-row:empty:not(:focus)  {
                            background-color:#555;
                            border:1px solid #ddd;
                        }
                        .gjs-cell:empty:not(:focus)  {
                            background-color:#888;
                            border:1px solid #eee;
                        }
                        .gjs-cell:empty:not(:focus)::before  {
                            content: attr(data-text);
                            position: relative;
                            background-color: #ccc;
                            padding: 0.3em 0.5em;
                            border-radius: 50%;
                            top: calc(50% - 0.5em);
                            left: calc(50% - 0.5em);
                        }
                        .gjs-row:empty:not(:focus)::before {
                            content: attr(data-text);
                            position: relative;
                            background-color: #ccc;
                            padding: 0.3em 0.5em;
                            border-radius: 50%;
                            top: calc(50% - 0.5em);
                            left: calc(50% - 0.5em);
                        }
                        </style>`;
                    break;
                case '3 Columns':
                    block.attributes.content = 
                    `<div  class='gjs-row' data-text='&#43;' data-gjs-droppable='.gjs-cell' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name='Row'>
                        <div  class='gjs-cell' data-text='&#43;' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                        <div  class='gjs-cell' data-text='&#43;' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                        <div  class='gjs-cell' data-text='&#43;' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell'></div>
                    </div>
                    <style>
                    .gjs-row {
                        display: table;
                        padding: 10px;
                        width: 100%;
                    }
                    .gjs-cell {
                        width: 8%;
                        display: table-cell;
                        height: 75px;
                    }
                    @media (max-width: 768px) {
                        .gjs-cell, .gjs-cell30, .gjs-cell70 {
                            width: 100%;
                            display: block;
                        }
                    }
                                            
                    .gjs-row:empty:not(:focus)  {
                        background-color:#555;
                        border:1px solid #ddd;
                    }
                    .gjs-cell:empty:not(:focus)  {
                        background-color:#888;
                        border:1px solid #eee;
                    }
                    .gjs-cell:empty:not(:focus)::before  {
                        content: attr(data-text);
                        position: relative;
                        background-color: #ccc;
                        padding: 0.3em 0.5em;
                        border-radius: 50%;
                        top: calc(50% - 0.5em);
                        left: calc(50% - 0.5em);
                    }
                    .gjs-row:empty:not(:focus)::before {
                        content: attr(data-text);
                        position: relative;
                        background-color: #ccc;
                        padding: 0.3em 0.5em;
                        border-radius: 50%;
                        top: calc(50% - 0.5em);
                        left: calc(50% - 0.5em);
                    }
                    </style>`;
                    break;
                case '2 Columns 3/7':
                    block.attributes.content = 
                    `<div  class='gjs-row' data-text='&#43;' data-gjs-droppable='.gjs-cell' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":0,"bl":0,"br":0,"minDim":1}' data-gjs-name='Row'>
                        <div  class='gjs-cell' data-text='&#43;' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell' style='width: 30%;'></div>
                        <div  class='gjs-cell' data-text='&#43;' data-gjs-draggable='.gjs-row' data-gjs-resizable='{"tl":0,"tc":0,"tr":0,"cl":0,"cr":1,"bl":0,"br":0,"minDim":1,"bc":0,"currentUnit":1,"step":0.2}' data-gjs-name='Cell' style='width: 70%;'></div>
                    </div>
                    <style>
                    .gjs-row {
                        display: table;
                        padding: 10px;
                        width: 100%;
                    }
                    .gjs-cell {
                        width: 8%;
                        display: table-cell;
                        height: 75px;
                    }
                    .gjs-cell30 {
                        width: 30%;
                    }
                            
                    .gjs-cell70 {
                        width: 70%;
                    }
                    @media (max-width: 768px) {
                        .gjs-cell, .gjs-cell30, .gjs-cell70 {
                            width: 100%;
                            display: block;
                        }
                    }
                                            
                    .gjs-row:empty:not(:focus)  {
                        background-color:#555;
                        border:1px solid #ddd;
                    }
                    .gjs-cell:empty:not(:focus)  {
                        background-color:#888;
                        border:1px solid #eee;
                    }
                    .gjs-cell:empty:not(:focus)::before  {
                        content: attr(data-text);
                        position: relative;
                        background-color: #ccc;
                        padding: 0.3em 0.5em;
                        border-radius: 50%;
                        top: calc(50% - 0.5em);
                        left: calc(50% - 0.5em);
                    }
                    .gjs-row:empty:not(:focus)::before {
                        content: attr(data-text);
                        position: relative;
                        background-color: #ccc;
                        padding: 0.3em 0.5em;
                        border-radius: 50%;
                        top: calc(50% - 0.5em);
                        left: calc(50% - 0.5em);
                    }
                    </style>`
                    break;
            }
            blocks[index] = block;
        });
        blockManager.render(blocks);

        editor.on('component:selected', () => {
            const selected = editor.getSelected();
            console.log(selected.attributes,editor.Panels);
            const openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
            if (selected.attributes.name == "Row" || selected.attributes.name == "Cell") {
                if(!openBlocksBtn || !openBlocksBtn.get('active')){
                    openBlocksBtn && openBlocksBtn.set('active', 1);
                }
            }
        });

        const undoManager = editor.UndoManager
        undoManager.start();

        editor.on('run:preview', () => {
            setIndex(1);
        });
        editor.on('stop:preview', () => {
            setIndex(4);
        });
        
        editor.load();
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