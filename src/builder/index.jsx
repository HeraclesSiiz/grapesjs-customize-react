import React, { Component } from 'react';

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

const svgNameList = ['column', '2columns', '3columns', '2col37', 'text', 'link', 'image', 'video', 'map', 'linkblock', 'quote', 'textsection', 'form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio', 'navbar', 'countdown'
];

const panelList = [];
panelList[1] = ['ti ti-device-desktop', 'ti ti-device-tablet', 'ti ti-device-mobile'];
panelList[0] = [];
panelList[2] = ['ti ti-marquee-2', '', 'ti ti-arrows-maximize', 'ti ti-code', '', '', 'ti ti-file-import', 'ti ti-eraser'];
panelList[3] = ['ti ti-pencil', 'ti ti-settings', 'ti ti-layers-subtract', 'ti ti-layout-grid'];

class Builder extends Component {
    state = {
        editor: '',
        preview: true,
        zIndex: 4,
        show: false,
    };

    componentDidMount() {
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
        const fontManager = editor.StyleManager.getProperty('typography', 'font-family');
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
        let blocks = blockManager.getAll();

        blocks.map((block, index) => {
            block.attributes.media = '<img src = "buildericons/' + svgNameList[index] + '.svg">';
            blocks[index] = block;
        });
        blockManager.render(blocks);

        const undoManager = editor.UndoManager
        undoManager.start();

        editor.on('run:preview', () => {
            this.setState({
                ...this.state,
                zIndex: 1
            })
        });
        editor.on('stop:preview', () => {
            this.setState({
                ...this.state,
                zIndex: 4
            })
        });

        editor.load();

        this.setState({
            ...this.state,
            editor: editor
        });
    }

    componentDidUpdate() {
    }

    preview = (run) => {
        const { editor } = this.state;
        const commandManager = editor.Commands
        if (run == true) {
            commandManager.get('preview').run(editor)
            this.setState({ ...this.state, zIndex: 1 });
        } else {
            commandManager.get('preview').stop(editor)
            this.setState({ ...this.state, zIndex: 4 });
        }
    }

    undo = () => {
        const { editor } = this.state;
        const undoManager = editor.UndoManager
        if (undoManager.hasUndo()) {
            undoManager.undo();
        }
    }

    redo = () => {
        const { editor } = this.state;
        const undoManager = editor.UndoManager
        if (undoManager.hasRedo()) {
            undoManager.redo();
        }
    }

    export = () => {
        const { editor } = this.state;
        editor.runCommand('gjs-export-zip');
    }

    stateChange = (states) => {
        this.setState({
            ...this.state,
            ...states
        })
    }

    render() {
        const { zIndex } = this.state;

        return (
            <>
                <Button.Group className='control demo' style={{ zIndex: zIndex }}>
                    <Button onClick={() => this.preview(true)} className="page_preview">Preview</Button>
                    <Button  color="blue" className="page_save">Save</Button>
                </Button.Group>
                <Icon onClick={() => this.preview(false)} style={{ zIndex: 5 - zIndex }} name="eye slash" size='big' className="page_preview"></Icon>
                <Button.Group className='control history' style={{ zIndex: zIndex }}>
                    <Button onClick={() => this.undo()} icon="undo" className="page_undo"></Button>
                    <Button onClick={() => this.redo()} icon="redo" className="page_redo"></Button>
                </Button.Group>
                <div id="gjs">
                </div>
            </>
        );
    }
}

export default Builder;