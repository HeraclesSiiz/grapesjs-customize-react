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

const svgNameList = ['column', '2columns', '3columns', '2col37', 'text', 'link', 'image', 'video', 'map', 'linkblock', 'quote', 'textsection', 'form', 'form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio', 'navbar', 'countdown', 'image'
];

const panelList = [];
panelList[1] = ['ti ti-device-desktop', 'ti ti-device-tablet', 'ti ti-device-mobile'];
panelList[0] = [];
panelList[2] = ['ti ti-marquee-2', '', 'ti ti-arrows-maximize', 'ti ti-code', '', '', 'ti ti-file-import', 'ti ti-eraser'];
panelList[3] = ['ti ti-pencil', 'ti ti-settings', 'ti ti-layers-subtract', 'ti ti-layout-grid', 'ti ti-puzzle'];

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
            styleManager: {
                clearProperties: true,
            },
            plugins: [
                basic, plugin, forms, navbar, countdown, pgexport
            ],
            pluginsOpts: {
                [forms]: {
                    blocks: ['input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio']
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
                styles: ['https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i|Open+Sans:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Lato:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Montserrat:300,300i,400,400i,500,500i,700,700i,800,80i,900,900i|Oswald:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Source+Sans+Pro:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Slabo+27px/13px:300,300i,400,400i,500,500i,700,700i,800,800i,900,900i|Raleway:400,400i,600,600i,700,700i,800,800i,900,900i|Poppins:400,400i,600,600i,700,700i,800,800i,900,900i|Josefin+Sans:100,100i,200,200i,300.300i.400,400i,600,600i,700,700i,800,800i,900,900i|Nunito:100,100i,200,200i,300.300i.400,400i,600,600i,700,700i,800,800i,900,900i&subset=latin,latin-ext']
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
        fontManager.set('list', fontOptions);

        styleManager.removeProperty('dimension', 'width');
        styleManager.removeProperty('dimension', 'height');
        styleManager.removeProperty('dimension', 'margin');
        styleManager.removeProperty('dimension', 'padding');

        styleManager.addProperty('dimension', {
            label: 'Width',
            property: 'width',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 2000,
        }, { at: 0 });

        styleManager.addProperty('dimension', {
            label: 'Height',
            property: 'height',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 2000,
        }, { at: 1 });

        styleManager.addProperty('dimension', {
            label: 'margin top',
            property: 'margin-top',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 200,
        }, { at: 4 });

        styleManager.addProperty('dimension', {
            label: 'margin right',
            property: 'margin-right',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 200,
        }, { at: 5 });

        styleManager.addProperty('dimension', {
            label: 'margin bottom',
            property: 'margin-bottom',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 200,
        }, { at: 6 });

        styleManager.addProperty('dimension', {
            label: 'margin left',
            property: 'margin-left',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 200,
        }, { at: 7 });

        styleManager.addProperty('dimension', {
            label: 'padding top',
            property: 'padding-top',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 200,
        }, { at: 8 });

        styleManager.addProperty('dimension', {
            label: 'padding right',
            property: 'padding-right',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 200,
        }, { at: 9 });

        styleManager.addProperty('dimension', {
            label: 'padding bottom',
            property: 'padding-bottom',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 200,
        }, { at: 10 });

        styleManager.addProperty('dimension', {
            label: 'padding left',
            property: 'padding-left',
            type: 'slider',
            units: ['px', '%', 'em', 'rem', 'vh', 'vw'],
            min: 0,
            max: 200,
        }, { at: 11 });

        const panelManager = editor.Panels;
        const blockManager = editor.Blocks;

        let panels = panelManager.getPanels();

        panelManager.addButton('views', {
            id: 'open-html-blocks',
            attributes: { title: "html blocks" },
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
                        type: 'header',
                        media: '<img src = "header.png">',
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
                        media: '<img src = "blog.jpg">',
                        attributes: {
                            title: 'Insert h3 block',
                        }
                    });

                    blockManager.render(blocks.filter((block) => {
                        if (block.attributes.category.attributes.label === 'html') {
                            return true;
                        }
                    }));

                    const html_blocks = document.querySelectorAll('.gjs-block');
                    for (var html_block of html_blocks) {
                        html_block.style.width = "90%";
                    }

                    editor.runCommand('open-blocks');
                },
                stop: function (editor) {
                    blockManager.render(blocks.filter((block) => {
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

        blockManager.add('background_section',{
            label:'Background Section',
            content:`<div  class='background_section' data-gjs-type='Background-Section' data-gjs-name="Background Section">
                <div class="svg-container" data-gjs-name='Fancy Divider'>
                    <svg version="1.1"  data-gjs-name='SVG' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 139" style="" xml:space="preserve" data-position="bottom" data-ct="37593" decoration-type="Ice Cream Melt" class="svg-shape-bottom" width="100%" preserveAspectRatio="xMidYMax slice" data-css="tve-u-171eaba456f">
                        <style type="text/css">
                            .p171eaba452c{opacity:0.2;enable-background:new    ;}
                            .p171eaba452d{opacity:0.8;enable-background:new    ;}
                        </style>
                        <path class="p171eaba452c" d="M662.2,0.4H507.9v0H338.8H0.5v67.4c0,0,21,5.9,17.9-12.9C14,28.7,52.5,17.3,56.6,55
                            c2.3,20.5-4.4,42.9,15.3,41.2c19.7-1.8-4.3-51.1,23.2-48.6c27.5,2.5,4.3,41.8,27.1,39.6c22.9-2.2,0.6-54.2,23.9-53.2
                            c28.1,1.1-2.8,82.2,29.7,83.7c32,1.4,1.6-54.8,30.5-55.5c26.5-0.7,2.9,36.8,33.2,36.8c26.5,0,10.1-36.8,29.3-37.2
                            s1.3,41.1,25.1,42.2c23.8,1.1,2-36.5,23.5-37.6s-7.1,71.9,21.3,71.2c28.4,0.7-0.2-72.3,21.3-71.2c21.5,1.1-0.3,38.6,23.5,37.6
                            c23.8-1.1,5.9-42.6,25.1-42.2c19.2,0.4,2.7,37.1,29.3,37.1c30.3,0,6.7-37.5,33.2-36.8c25.6,0.6,4.6,44.9,21.8,53.9v0
                            c1.8,0.9,3.8,1.5,6.2,1.6c2.2,0.1,4.1-0.1,5.8-0.5c0,0,0.1,0,0.1,0c22.2-5.7-2.2-54.3,24.6-55C556.3,61.5,532.7,99,563,99
                            c26.5,0,10-36.8,29.3-37.2c19.2-0.4,1.3,41.1,25.1,42.2c23.8,1.1,2-36.5,23.5-37.6c21.5-1.1-7.1,71.9,21.3,71.2
                            c28.4,0.7-0.2-72.3,21.3-71.2c21.5,1.1-0.3,38.6,23.5,37.6c23.8-1.1,5.9-42.6,25.1-42.2S735,99,761.6,99c30.3,0,6.7-37.5,33.2-36.8
                            c28.8,0.7-1.6,56.9,30.5,55.5c32.5-1.4,1.6-82.6,29.7-83.7c23.3-0.9,1,51.1,23.9,53.2s-0.3-37.1,27.1-39.6
                            c27.5-2.5,3.5,46.8,23.2,48.6c19.7,1.8,13-20.7,15.3-41.2c4.1-37.7,42.6-26.3,38.2,0c-3.1,18.8,17.9,12.9,17.9,12.9V0.4H662.2z"></path>
                        <path class="p171eaba452d" d="M662.2-0.1H507.9v0H338.8H0.5v65.3c0,0,21,5.9,17.9-12.9c-4.4-26.3,34.1-37.7,38.2,0
                            c2.3,20.5-4.4,42.9,15.3,41.2c19.7-1.8-4.3-51.1,23.2-48.6c27.5,2.5,4.3,41.8,27.1,39.6s0.6-54.2,23.9-53.2
                            c28.1,1.1-2.8,82.2,29.7,83.7c32,1.4,1.6-54.8,30.5-55.5c26.5-0.7,2.9,36.8,33.2,36.8c26.5,0,10.1-36.8,29.3-37.2
                            s1.3,41.1,25.1,42.2c23.8,1.1,2-36.5,23.5-37.6c21.5-1.1-7.1,71.9,21.3,71.2c28.4,0.7-0.2-72.3,21.3-71.2
                            c21.5,1.1-0.3,38.6,23.5,37.6c23.8-1.1,5.9-42.6,25.1-42.2c19.2,0.4,2.7,37.2,29.3,37.2c30.3,0,6.7-37.5,33.2-36.8
                            c25.6,0.6,4.6,44.9,21.8,53.9v0c1.8,0.9,3.8,1.5,6.2,1.6c2.2,0.1,4.1-0.1,5.8-0.5c0,0,0.1,0,0.1,0c22.2-5.7-2.2-54.3,24.6-55
                            c26.5-0.7,2.9,36.8,33.2,36.8c26.5,0,10-36.8,29.3-37.2c19.2-0.4,1.3,41.1,25.1,42.2c23.8,1.1,2-36.5,23.5-37.6
                            c21.5-1.1-7.1,71.9,21.3,71.2c28.4,0.7-0.2-72.3,21.3-71.2c21.5,1.1-0.3,38.6,23.5,37.6c23.8-1.1,5.9-42.6,25.1-42.2
                            c19.2,0.4,2.7,37.2,29.2,37.2c30.3,0,6.7-37.5,33.2-36.8c28.8,0.7-1.6,56.9,30.5,55.5c32.5-1.4,1.6-82.6,29.7-83.7
                            c23.3-0.9,1,51.1,23.9,53.2c22.9,2.1-0.3-37.1,27.1-39.6c27.5-2.5,3.5,46.8,23.2,48.6c19.7,1.8,13-20.7,15.3-41.2
                            c4.1-37.7,42.6-26.3,38.2,0c-3.1,18.8,17.9,12.9,17.9,12.9V-0.1H662.2z"></path>
                        <path class="p171eaba452e" d="M999.7,20.9V-0.5H-0.7v29.3h0.4V62c0,0,21,5.9,17.9-12.9c-1.3-7.5,1-13.8,5-18.1c-0.4,0.2-0.8,0.5-1.1,0.7
                            c-2,1.4-4,2.9-5.4,4.7c-0.8,1-1.3,3.1-2.6,3.7c-0.5,0.2-0.7-0.6-0.7-0.8c-0.5-4,2.5-7.7,6.8-10.4h27.1c4.6,3.7,8.1,10.3,9.2,20.4
                            c2.3,20.5-4.4,42.9,15.3,41.2c19.4-1.8-3.4-49.4,21.9-48.7c-0.4-0.1-0.9-0.2-1.3-0.3c-0.3-0.1-0.2-0.6-0.1-0.7
                            c2-1.5,3.6-1.9,6.4-1.7c2.3,0.2,4.3,1,5.3,2.7c0.1,0.2,0.3,1-0.1,1.1c-1.6,0.4-4-0.5-5.7-0.7c-0.2,0-0.5,0-0.8,0
                            c23.8,4.5,2.6,41.4,24.8,39.3c21.1-2,3.7-46.5,19.3-52.6h8.2c21.7,7.9-4.8,81.6,26.1,83c32,1.4,1.6-54.8,30.5-55.5
                            c26.5-0.7,2.9,36.8,33.2,36.8c21.7,0,14.6-24.6,21.8-33.8c-0.9,0.3-1.8,0.6-2.7,1c-0.5,0.2-1.1,0.1-1.7,0.2
                            c-0.5,0.1-0.3-1.4-0.2-1.6c1.3-1.9,2.8-2.7,5.3-3.5c2.2-0.7,4.3-0.9,6.4,0c0.1,0.1,0.2,0.3,0.2,0.5c0,0,0,0,0,0
                            c19.2-0.4,1.3,41.1,25.1,42.2c23.8,1.1,2-36.5,23.5-37.6c21.5-1.1-7.1,71.9,21.3,71.2c28.4,0.7-0.2-72.3,21.3-71.2
                            c21.5,1.1-0.3,38.6,23.5,37.6c23.8-1.1,5.9-42.6,25.1-42.2c0,0,0,0,0,0c0-0.3,0.1-0.5,0.2-0.5c2.2-0.9,4.2-0.7,6.4,0
                            c2.5,0.8,4,1.7,5.3,3.5c0.1,0.2,0.3,1.6-0.2,1.6c-0.5-0.1-1.2,0-1.7-0.2c-0.9-0.4-1.8-0.7-2.7-1c7.2,9.2,0.1,33.8,21.8,33.8
                            c30.3,0,6.7-37.5,33.2-36.8c25.6,0.6,4.6,44.9,21.8,53.9v0c1.8,0.9,3.8,1.5,6.2,1.6c2.2,0.1,4.1-0.1,5.8-0.5c0,0,0.1,0,0.1,0
                            c22.2-5.7-2.2-54.3,24.6-55c26.5-0.7,2.9,36.8,33.2,36.8c21.7,0,14.6-24.6,21.8-33.8c-0.9,0.3-1.8,0.7-2.7,1
                            c-0.5,0.2-1.1,0.1-1.7,0.2c-0.5,0.1-0.3-1.4-0.2-1.6c1.3-1.9,2.8-2.7,5.3-3.5c2.2-0.7,4.3-0.9,6.4,0c0.2,0.1,0.2,0.3,0.2,0.5
                            c0,0,0,0,0,0c19.2-0.4,1.3,41.1,25.1,42.2c23.8,1.1,2-36.5,23.5-37.6c21.5-1.1-7.1,72,21.3,71.2c28.4,0.7-0.2-72.3,21.3-71.2
                            c21.5,1.1-0.3,38.6,23.5,37.6c23.8-1.1,5.9-42.6,25.1-42.2c0,0,0,0,0,0c0-0.3,0.1-0.5,0.2-0.5c2.2-0.9,4.2-0.7,6.4,0
                            c2.5,0.8,4,1.7,5.3,3.5c0.1,0.2,0.3,1.6-0.2,1.6c-0.5-0.1-1.2,0-1.7-0.2c-0.9-0.4-1.8-0.7-2.7-1c7.2,9.2,0.1,33.8,21.8,33.8
                            c30.3,0,6.7-37.5,33.2-36.8c28.8,0.7-1.6,56.9,30.5,55.5c31-1.4,4.3-75.3,26.2-83h8c15.7,6-1.8,50.6,19.4,52.6
                            c22.2,2.1,1-34.8,24.8-39.3c-0.3,0-0.5,0-0.8,0c-1.7,0.1-4.1,1.1-5.7,0.7c-0.4-0.1-0.2-0.9-0.1-1.1c1-1.7,3-2.5,5.3-2.7
                            c2.8-0.3,4.4,0.2,6.4,1.7c0.2,0.1,0.2,0.7-0.1,0.7c-0.4,0.1-0.9,0.2-1.3,0.3c25.3-0.8,2.5,46.9,21.9,48.7
                            c19.7,1.8,13-20.7,15.3-41.2c1.1-10.1,4.7-16.7,9.3-20.4h27c4.3,2.7,7.3,6.4,6.8,10.5c0,0.2-0.2,1.1-0.7,0.8
                            c-1.3-0.6-1.9-2.7-2.6-3.7c-1.4-1.8-3.4-3.3-5.4-4.7c-0.4-0.3-0.7-0.5-1.1-0.7c4,4.3,6.2,10.6,5,18.1C978.8,68,999.9,62,999.9,62
                            V20.9C999.9,20.9,999.8,20.9,999.7,20.9z M12.5,59.3c-0.7,0.6-1,1.4-2.3,1.4c-0.7,0-1.4-0.1-2-0.4C7.4,60,7,59.5,6.6,58.8
                            c-0.2-0.4-0.3-0.8-0.4-1.3c0-0.1-0.1-0.2-0.1-0.3v0c0-0.1,0-0.2,0-0.3c0,0,0,0,0,0c0,0,0,0,0-0.1c0-0.1,0-0.1,0-0.2
                            c0-0.1,0-0.1,0-0.1c0-0.5,0.3-1.1,0.8-0.9c0.4,0.1,0.8,0.2,1.1,0.4c0.5,0.2,0.8,0.6,1.3,0.7c0.5,0.2,1.1,0.1,1.6,0.2
                            c0.3,0.1,0.5,0.2,0.8,0.3c0.2,0.1,0.4,0.3,0.6,0.4C12.9,57.8,12.8,59.1,12.5,59.3z M67.1,89.7c-4.1,0.1-5.7-4.2-6.4-6.8
                            c-1.1-4.1-1.4-8.2-1.4-12.4c0.1-10.1,1-20.2,0.4-30.3c0-0.5,0.7-2.7,1.3-1.2c1.9,4.8,1.4,10.2,1.1,15.1c-0.2,4.4-0.1,8.9-0.1,13.3
                            c-0.1,3.6-0.2,7.2,0.6,10.8c0.7,3.3,2.6,6.2,4.8,9C67.8,87.6,68.3,89.7,67.1,89.7z M125.3,79.3c-0.5,0.7-1.1,1.3-2.1,1.4
                            c-0.8,0.1-1.3-0.1-2-0.4c-0.6-0.3-0.6-1.2-0.6-1.7c0-0.4,0-1.4,0.5-1.7c0.6-0.3,1.2-0.5,1.9-0.4c1,0.1,1.6,0.7,2.1,1.4
                            C125.6,78.2,125.6,78.9,125.3,79.3z M167.7,106.9c-4.3-1.6-5.1-8.4-5.6-11.7c-0.7-4.9-0.7-9.9-0.6-14.8c0.4-11,0-21.9-0.1-32.8
                            c0-0.2,0.2-0.7,0.4-0.3c2.6,4.5,2.7,9.9,2.8,14.9c0.1,5.1,0.1,10.2,0,15.4c-0.1,4.6-0.2,9.2,0.3,13.8c0.5,4.6,2.5,8.6,3.9,13
                            C169,104.7,169.2,107.4,167.7,106.9z M178.9,107.6c-0.6,0-0.4-1.3-0.2-1.6c1.4-1.6,3.3-3.1,4.3-4.8c1-1.7,1.1-3.5,1.9-5.2
                            c0.1-0.2,0.4-0.3,0.5,0C186.7,99.4,184.7,107.7,178.9,107.6z M187.5,75.2c-0.4,2-0.1,4.4-1,6.4c-0.1,0.2-0.3,0.4-0.4,0.1
                            c-1.5-1.6-0.8-4.5-0.5-6.3c0.3-2.2,0.8-4.5,1.5-6.7c0.1-0.3,0.4-0.1,0.4,0.1C188,70.9,187.8,73.1,187.5,75.2z M235.5,91
                            c-2.3,1.3-5.7-2.8-6.5-3.9c-1.4-2-2.4-4.5-1.5-6.8c0.1-0.3,0.5-0.5,0.8-0.2c0.8,0.9,1,2,1.6,2.9c0.9,1.3,2.3,2.4,3.8,3.4
                            C235.1,87.1,237.8,89.7,235.5,91z M246.6,87.1C246.6,87.1,246.6,87.1,246.6,87.1c-0.1,0.4-0.2,0.9-0.6,1c-0.2,0.1-0.4,0.1-0.5,0.2
                            c-0.3,0.1-0.5,0-0.8-0.1c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1,0-0.2,0-0.2-0.1c-0.4-0.2-0.5-0.8-0.5-1.1c0-0.3,0-0.9,0.4-1.1
                            c0,0,0.1,0,0.2-0.1c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.4-0.2,0.5-0.2c0.2,0,0.4,0,0.5,0c0.4,0,0.4,0.3,0.6,0.4
                            c0.3,0.1,0.4,0.5,0.4,0.7C246.8,86.4,246.7,86.8,246.6,87.1z M288.7,93c-0.1,0-0.3,0.1-0.4,0.1c-0.3,0-0.5-0.2-0.7-0.4
                            c-0.5-0.5-0.7-1-1-1.6c-0.3-0.6-0.2-1.4,0.1-2c0.2-0.4,0.6-0.7,1-0.3c0.4,0.4,0.6,0.7,0.8,1.2c0.1,0.3,0.3,0.5,0.3,0.8
                            c0,0.2,0.1,0.4,0.1,0.5C289.1,91.7,289.4,92.9,288.7,93z M301.7,85.3c-0.6,2.7-1.3,5.5-3.1,7.9c-0.6,0.8-1.3,1.7-2.3,2.3
                            c-1.1,0.6-1.8,0.3-3,0.1c-0.8-0.1-1-2-0.2-2.3c2.1-0.6,4.1-2.8,4.9-4.5c1.2-2.5,1.8-5.3,2.3-8c0.7-4.1,0.3-8.7,2.2-12.6
                            c0.2-0.5,0.5,0.2,0.5,0.4C303.2,74.3,302.9,79.8,301.7,85.3z M333.2,130.7c-2.9-6.4-3.2-13.4-3.5-20.1c-0.3-7.6,0-15.1,0.2-22.7
                            c0-0.8,0.8-1.4,0.9-0.3c0.7,6.7,0.8,13.3,1,20c0.3,7.4,1.2,14.8,2.1,22.1C334,130.1,333.6,131.5,333.2,130.7z M346.3,110.6
                            c-0.3,6.7-0.6,13.7-3.5,20.1c-0.4,0.8-0.8-0.6-0.8-0.9c0.9-7.4,1.9-14.7,2.1-22.1c0.2-6.7,0.4-13.3,1-20c0.1-1.1,0.8-0.5,0.9,0.3
                            C346.3,95.5,346.6,103.1,346.3,110.6z M382.7,95.7c-1.2,0.2-1.9,0.5-3-0.1c-1-0.6-1.7-1.4-2.3-2.3c-1.7-2.4-2.5-5.2-3.1-7.9
                            c-1.2-5.5-1.5-11-1.3-16.6c0-0.2,0.3-0.8,0.5-0.4c2,3.9,1.6,8.5,2.2,12.6c0.4,2.7,1,5.4,2.3,8c0.8,1.6,2.7,3.8,4.9,4.5
                            C383.6,93.6,383.5,95.6,382.7,95.7z M389.5,91.1c-0.3,0.6-0.4,1.1-1,1.6c-0.2,0.2-0.4,0.4-0.7,0.4c-0.1,0-0.3-0.1-0.4-0.1
                            c-0.7-0.1-0.5-1.3-0.3-1.7c0-0.1,0.1-0.3,0.1-0.5c0.1-0.3,0.2-0.5,0.3-0.8c0.2-0.5,0.5-0.8,0.8-1.2c0.4-0.4,0.9-0.1,1,0.3
                            C389.7,89.7,389.8,90.5,389.5,91.1z M431.9,87.8c0,0-0.1,0-0.2,0.1c-0.1,0.1-0.2,0.3-0.4,0.3c-0.3,0.1-0.5,0.2-0.8,0.1
                            c-0.2-0.1-0.4-0.1-0.5-0.2c-0.4-0.2-0.5-0.6-0.6-1c0,0,0,0,0,0c-0.1-0.3-0.2-0.6-0.1-0.9c0-0.2,0.1-0.6,0.4-0.7
                            c0.2-0.1,0.2-0.5,0.6-0.4c0.2,0,0.4,0,0.5,0s0.4,0.2,0.5,0.2c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0,0.2,0,0.2,0.1c0.4,0.1,0.4,0.8,0.4,1.1
                            C432.4,87,432.3,87.7,431.9,87.8z M447,87c-0.8,1.2-4.2,5.2-6.5,3.9c-2.3-1.2,0.5-3.8,1.8-4.6c1.5-0.9,2.9-2,3.8-3.4
                            c0.6-0.9,0.8-2,1.6-2.9c0.3-0.3,0.7-0.1,0.8,0.2C449.4,82.5,448.4,85,447,87z M489.5,81.6c-0.8-2-0.6-4.3-1-6.4
                            c-0.4-2.1-0.5-4.3,0-6.4c0-0.2,0.3-0.5,0.4-0.1c0.7,2.2,1.2,4.5,1.5,6.7c0.3,1.8,1,4.7-0.5,6.3C489.8,82,489.6,81.8,489.5,81.6z
                            M492.3,105.1c-2-2.7-2.5-6.9-1.7-9.1c0.1-0.3,0.3-0.2,0.5,0c0.6,1.1,0.8,2.3,1.2,3.5V105.1z M559,91c-2.3,1.3-5.7-2.8-6.5-3.9
                            c-1.4-2-2.4-4.5-1.5-6.8c0.1-0.3,0.5-0.5,0.8-0.2c0.8,0.9,1,2,1.6,2.9c0.9,1.3,2.3,2.5,3.8,3.4C558.5,87.2,561.3,89.8,559,91z
                            M570.1,87.1C570.1,87.1,570,87.1,570.1,87.1c-0.1,0.4-0.2,0.9-0.6,1c-0.2,0.1-0.3,0.1-0.5,0.2c-0.3,0.1-0.5,0-0.8-0.1
                            c-0.2-0.1-0.3-0.2-0.4-0.3c-0.1,0-0.2,0-0.2-0.1c-0.4-0.2-0.5-0.8-0.5-1.1c0-0.3,0-0.9,0.4-1.1c0,0,0.1,0,0.2-0.1
                            c0.1-0.1,0.2-0.3,0.4-0.4c0.2-0.1,0.4-0.2,0.5-0.2c0.2,0,0.4,0,0.5,0c0.4,0,0.4,0.3,0.6,0.4c0.3,0.1,0.3,0.5,0.4,0.7
                            C570.2,86.5,570.2,86.8,570.1,87.1z M612.1,93c-0.2,0-0.3,0.1-0.4,0.1c-0.3,0-0.5-0.2-0.7-0.4c-0.5-0.5-0.7-1-1-1.6
                            c-0.3-0.6-0.2-1.4,0.1-2c0.2-0.4,0.6-0.7,1-0.3c0.4,0.4,0.6,0.7,0.8,1.2c0.1,0.3,0.3,0.5,0.3,0.8c0,0.2,0.1,0.4,0.1,0.5
                            C612.6,91.7,612.8,93,612.1,93z M625.2,85.4c-0.6,2.7-1.3,5.5-3.1,7.9c-0.6,0.8-1.3,1.7-2.3,2.3c-1.1,0.6-1.8,0.3-3,0.2
                            c-0.8-0.1-1-2-0.2-2.3c2.2-0.7,4.1-2.8,4.9-4.5c1.2-2.5,1.8-5.3,2.3-8c0.7-4.1,0.3-8.7,2.2-12.6c0.2-0.5,0.5,0.2,0.5,0.4
                            C626.7,74.3,626.4,79.9,625.2,85.4z M656.7,130.7c-2.9-6.4-3.2-13.4-3.5-20.1c-0.3-7.6,0-15.1,0.2-22.7c0-0.8,0.8-1.4,0.9-0.3
                            c0.7,6.7,0.8,13.3,1,20c0.3,7.4,1.2,14.8,2.1,22.1C657.5,130.1,657.1,131.6,656.7,130.7z M669.7,110.7c-0.3,6.7-0.6,13.7-3.5,20.1
                            c-0.4,0.9-0.8-0.6-0.8-0.9c0.9-7.4,1.9-14.7,2.1-22.1c0.2-6.7,0.4-13.3,1-20c0.1-1.1,0.8-0.5,0.9,0.3
                            C669.7,95.6,670,103.1,669.7,110.7z M706.1,95.7c-1.2,0.2-1.9,0.5-3-0.2c-1-0.6-1.7-1.4-2.3-2.3c-1.7-2.4-2.5-5.2-3.1-7.9
                            c-1.2-5.5-1.5-11-1.3-16.6c0-0.2,0.3-0.8,0.5-0.4c2,3.9,1.6,8.5,2.2,12.6c0.4,2.7,1,5.4,2.3,8c0.8,1.6,2.7,3.8,4.9,4.5
                            C707.1,93.7,706.9,95.6,706.1,95.7z M713,91.2c-0.3,0.6-0.4,1.1-1,1.6c-0.2,0.2-0.4,0.3-0.7,0.4c-0.1,0-0.3-0.1-0.4-0.1
                            c-0.7-0.1-0.5-1.3-0.3-1.7c0-0.1,0.1-0.3,0.1-0.5c0.1-0.3,0.2-0.5,0.3-0.8c0.2-0.5,0.5-0.8,0.8-1.2c0.4-0.4,0.8-0.1,1,0.3
                            C713.2,89.8,713.2,90.6,713,91.2z M755.4,87.8c0,0-0.1,0-0.2,0.1c-0.1,0.2-0.2,0.3-0.4,0.3c-0.3,0.1-0.5,0.2-0.8,0.1
                            c-0.2,0-0.4-0.1-0.5-0.2c-0.4-0.2-0.5-0.6-0.6-1c0,0,0,0,0,0c-0.1-0.3-0.2-0.6-0.1-1c0-0.2,0.1-0.5,0.4-0.7c0.2-0.1,0.2-0.5,0.6-0.4
                            c0.2,0,0.4,0,0.5,0s0.4,0.1,0.5,0.2c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0,0.2,0.1,0.2,0.1c0.4,0.2,0.4,0.8,0.4,1.1
                            C755.9,87.1,755.8,87.7,755.4,87.8z M770.4,87.1c-0.8,1.1-4.2,5.2-6.5,3.9c-2.3-1.2,0.5-3.8,1.8-4.7c1.5-0.9,2.8-2,3.8-3.4
                            c0.6-0.9,0.8-2,1.6-2.9c0.3-0.3,0.7-0.1,0.8,0.2C772.8,82.5,771.9,85,770.4,87.1z M813,81.6c-0.8-2-0.6-4.3-1-6.4
                            c-0.4-2.1-0.5-4.3,0-6.4c0-0.2,0.3-0.5,0.4-0.1c0.7,2.2,1.2,4.5,1.5,6.7c0.3,1.8,1,4.7-0.5,6.3C813.2,82,813.1,81.8,813,81.6z
                            M820.5,107.6c-5.8,0.1-7.7-8.3-6.5-11.6c0.1-0.3,0.3-0.2,0.5,0c0.9,1.7,1,3.5,1.9,5.2c1,1.8,2.9,3.2,4.3,4.8
                            C821,106.3,821.1,107.6,820.5,107.6z M837.9,80.4c0.2,5,0.2,9.9-0.6,14.8c-0.5,3.3-1.2,10.2-5.6,11.7c-1.5,0.5-1.3-2.3-1.1-2.7
                            c1.4-4.4,3.4-8.4,3.8-13c0.5-4.6,0.3-9.2,0.3-13.8c-0.1-5.1-0.1-10.2,0-15.4c0.1-4.9,0.2-10.3,2.8-14.8c0.2-0.4,0.4,0.2,0.4,0.3
                            C837.9,58.5,837.5,69.4,837.9,80.4z M878.8,78.6c0,0.4-0.1,1.4-0.6,1.7c-0.7,0.3-1.2,0.5-2,0.4c-1-0.1-1.6-0.7-2.1-1.4
                            c-0.3-0.4-0.3-1.1,0-1.5c0.5-0.6,1.2-1.3,2.2-1.4c0.8-0.1,1.3,0.1,1.9,0.4C878.9,77.2,878.8,78.2,878.8,78.6z M938.7,82.9
                            c-0.7,2.6-2.3,6.9-6.4,6.8c-1.1,0-0.6-2.1-0.3-2.5c2.2-2.8,4.1-5.7,4.8-9c0.7-3.5,0.7-7.2,0.6-10.8c-0.1-4.4,0.1-8.9-0.1-13.3
                            c-0.2-5-0.7-10.3,1.2-15.2c0.6-1.4,1.3,0.8,1.3,1.2c-0.6,10.1,0.2,20.2,0.4,30.3C940.1,74.7,939.8,78.8,938.7,82.9z M993.4,57
                            C993.4,57,993.4,57,993.4,57c0,0.2,0,0.3-0.1,0.3v0c0,0.1,0,0.2-0.1,0.3c-0.1,0.4-0.2,0.9-0.5,1.3c-0.4,0.7-0.8,1.2-1.6,1.6
                            c-0.6,0.3-1.3,0.4-2,0.4c-1.3,0-1.6-0.8-2.3-1.4c-0.3-0.3-0.4-1.5,0.2-1.7c0.2-0.1,0.4-0.2,0.6-0.3c0.3-0.1,0.6-0.2,0.8-0.3
                            c0.5-0.2,1.1-0.1,1.6-0.2c0.5-0.2,0.8-0.5,1.3-0.7c0.4-0.1,0.7-0.3,1.1-0.4c0.6-0.2,0.8,0.4,0.8,0.9c0,0,0,0,0,0.1
                            S993.4,56.9,993.4,57C993.4,57,993.4,57,993.4,57z">
                        </path>
                    </svg>
                </div>
                <div class="edit-container" data-gjs-droppable='.gjs-row' data-gjs-name='Background Content'>
                </div>
            </div>
            <style>
            .background_section {
                position: relative;
                width: 100%;
                height:600px;
                fill:white;
                display: flex;
                
                flex-direction: column;
                /* flex-direction: row; */
                /* flex-direction: column-reverse; */
                /* flex-direction: row-reverse; */
            }
            .svg-container{
                /* flex-basis: 250px; */
                position: relative;
                display: grid;
            
                /* for up and down */
                width: 100%;
            
                /* for right and left */
                /* width: 250px; */
            }
            svg{
                height:250px;
            
                width:100%;
                /* for down */
                /* transform: rotate(180deg);
                margin-bottom: -5px; */
            
                
                /* width:600px; */
                /* For left */
                /* transform: rotate(270deg);
                transform-origin: 300px 300px; */
            
                /* For right */
                /* transform: rotate(90deg);
                transform-origin: 125px 125px; */
            
            }
            .edit-container{
                flex-basis: calc(100% - 250px);
            }
            </style>`
        });

        let blocks = blockManager.getAll();
        blocks.map((block, index) => {
            block.attributes.media = '<img src = "buildericons/' + svgNameList[index] + '.svg">';
            switch (block.attributes.label) {
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
                        color: 'black',
                        'max-width': '100%'
                    };
            }
            blocks[index] = block;
        });

        // editor.Components.addType('Background-Section', {
        //     model: {
        //       defaults: {
        //         // When this component is selected, the Style Manager will show only the following properties
        //         stylable: ['width', 'height']
        //       }
        //     }
        //   });

        // editor.on('component:styleUpdate:height', (model) => { console.log(model); });

        // editor.DomComponents.addType('Background-Section', {
        //     extend: 'Background-Section',
        //     extendFn: ['init'],
        //     model: {
        //       init() {
        //           console.log(this);
        //           this.listenTo(this, 'change:components',this.handleStyleChange);
        //           this.listenTo(this, 'change:attributes', this.handleAttrChange);

        //       },
        //       handleChange(){
        //         alert('handle changed');
        //       },
        //       handleStyleChange() {
        //         alert('style changed');
        //       },
        //       handleAttrChange() {
        //         alert('attr changed');
        //       }
        //     }
        //   })

        editor.on('style:property:update', styleEl => {
            const properties = ['divider-type','flex-direction','divider-height'];
            const attr = styleEl.property.attributes;
            
            if(properties.includes(attr.name)){
                console.log(attr.name,attr.value);
                const back_section = editor.getSelected();
                const svg_contain = back_section.attributes.components.at(0);
                const edit_contain = back_section.attributes.components.at(1);
                const svg = svg_contain.attributes.components.at(0);
                
                const back_section_style = getComputedStyle(back_section.view.el);
                const section_height = parseInt(back_section_style.height.replace('px',''));
                let svg_height;
                if(svg.getStyle().height != undefined){
                    svg_height = parseInt(svg.getStyle().height.replace('px',''));
                }
                if(!svg_height){
                    svg_height = 250;
                }

                switch(attr.name){
                    case 'flex-direction':                  
                        switch(attr.value){
                            case 'column':
                                back_section.setStyle({width:'100%','flex-direction':'column'});
                                svg_contain.setStyle({width:'100%'});
                                svg.setStyle({height:svg_height+'px','width':'100%',transform:'rotate(0deg)'});
                                break;
                            case 'row-reverse':
                                back_section.setStyle({width:'100%','flex-direction':'row-reverse'});
                                svg_contain.setStyle({width:svg_height+'px'});
                                svg.setStyle({height:svg_height+'px',width:back_section_style.height,transform:'rotate(90deg)','transform-origin':svg_height/2+'px '+svg_height/2+'px'});
                                break;
                            case 'column-reverse':
                                back_section.setStyle({width:'100%','flex-direction':'column-reverse'});
                                svg_contain.setStyle({width:'100%'});
                                svg.setStyle({height:svg_height+'px',width:'100%',transform:'rotate(180deg)',marginBottom:'-5px'});
                                break;
                            case 'row':
                                back_section.setStyle({width:'100%','flex-direction':'row'});
                                svg_contain.setStyle({width:svg_height+'px'});
                                svg.setStyle({height:svg_height+'px',width:back_section_style.height,transform:'rotate(270deg)','transform-origin':section_height/2+'px '+section_height/2+'px'});
                                break;
                        }
                        break;
                    case 'divider-height':
                        console.log(attr.name,attr.value);
                        edit_contain.setStyle({'flex-basis':'calc(100% - '+attr.value+'px)'});
                        switch(back_section.getStyle()['flex-direction']){
                            case 'row-reverse':
                                svg.setStyle({...svg.getStyle(),'transform-origin':attr.value/2+'px '+attr.value/2+'px ',height:attr.value+'px'});
                            case 'row':
                            case 'column-reverse':
                            case 'column':
                                svg.setStyle({...svg.getStyle(),height:attr.value+'px'});
                            default:
                                svg.setStyle({...svg.getStyle(),height:attr.value+'px'});
                        }
                        break;
                }
            }
        });
        
        editor.StyleManager.removeSector('flex');
        editor.on('component:selected', (component) => {
            if(component.attributes.name == 'Background Content' || component.attributes.name == 'Fancy Divider'){
                editor.select(component.parent());
            }
            if(component.attributes.name == 'SVG'){
                editor.select(component.parent().parent());
            }
            const openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
            if (component.attributes.name === "Row" || component.attributes.name === "Cell") {
                if (!openBlocksBtn || !openBlocksBtn.get('active')) {
                    openBlocksBtn && openBlocksBtn.set('active', 1);
                }
            }

            if(component.attributes.type == 'Background-Section') {
                editor.StyleManager.addSector('fancy_divider', {
                    name: 'Fancy Divider',
                    open: false,
                    properties: [
                        {
                            label: 'type',
                            name: 'divider-type',
                            type: 'select',
                            options: [
                                { id: 'asymmetrical', label: 'Asymmetrical' },
                                { id: 'offset_corner', label: 'Offset Corner' },
                                { id: 'rounded_corner', label: 'Rounded Corner' },
                            ]
                        }, 
                        {
                            label: 'direction',
                            name: 'flex-direction',
                            type: 'radio',
                            options: [
                                { id: 'column', label: 'top' },
                                { id: 'row-reverse', label: 'right' },
                                { id: 'column-reverse', label: 'bottom' },
                                { id: 'row', label: 'left' },
                            ]
                        }, 
                        {
                            label: 'height',
                            name: 'divider-height',
                            type: 'slider',
                            min: 0,
                            max: 500,
                            units: ['px']
                        },
                    ],
                });
            }
        });
        editor.on('component:unselected', (component) => {
            editor.StyleManager.removeSector('fancy_divider');
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
        editor.Commands.stop('open-html-blocks');

        setEditor(editor);
    }, []);

    const setPreview = (run) => {
        const commandManager = editor.Commands
        if (run === true) {
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
                <Button color="blue" className="page_save">Save</Button>
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