/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

const nestedH1Fix = (main, document) => {
    const nestedH1 = document.querySelector('h1 h1');
    const parenth1 = nestedH1.parentNode.parentNode;
    const title = nestedH1.innerText;
    parenth1.innerText = title;
}

const createFeaturedWell = (main, document) => {
    const well = document.querySelector('.paragraphs-item-featured-well');
    if (well !== null) {
        const contents = document.createElement('div');
    contents.innerHTML = well.innerHTML;
    const cells = [
        ['Feature Well'],
        [contents]
    ]
    const block = WebImporter.DOMUtils.createTable(cells, document);
    well.after(block);
    }
    
}

const createYouTubeBlock = (main, document) => {
    const video = document.querySelector('iframe[src*="https://www.youtube.com"');
    if (video !== null) {
        let src = video.src;
        const vidId = src.split('embed/')[1];
        src = `https://youtu.be/${vidId}`;
        const cells = [
            ['Video'],
            [src]
        ]
        const block = WebImporter.DOMUtils.createTable(cells, document);
        video.after(block);
    }
    
}

const createColumnsBlock = (main, document) => {
    const columnCells = document.querySelectorAll('.col-sm-6:first-of-type');
    if (columnCells !== null) {
        columnCells.forEach(c => {
            const row = c.parentNode;
            const col1 = row.firstElementChild;
            const col2 = row.lastElementChild;
            const cells = [
                ['Columns'],
                [col1, col2]
            ]
            const block = WebImporter.DOMUtils.createTable(cells, document);
            row.after(block);       
    
        });
    }
   
}

export default {
    /**
     * Apply DOM operations to the provided document and return
     * the root element to be then transformed to Markdown.
     * @param {HTMLDocument} document The document
     * @param {string} url The url of the page imported
     * @param {string} html The raw html (the document is cleaned up during preprocessing)
     * @param {object} params Object containing some parameters given by the import process.
     * @returns {HTMLElement} The root element to be transformed
     */
    transformDOM: ({
      // eslint-disable-next-line no-unused-vars
      document, url, html, params,
    }) => {
      // define the main element: the one that will be transformed to Markdown
      const main = document.body;
      nestedH1Fix(main, document);
      createYouTubeBlock(main, document);
      createFeaturedWell(main, document);
      createColumnsBlock(main, document);
      // attempt to remove non-content elements
      WebImporter.DOMUtils.remove(main, [
        'header',
        '.header',
        'nav',
        '.nav',
        'footer',
        '.footer',
        'iframe',
        'noscript',
        '.breadcrumb-row',
        '.visually-hidden',
        '.paragraphs-item-featured-well'
      ]);
  
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      WebImporter.rules.convertIcons(main, document);
  
      return main;
    },
  
    /**
     * Return a path that describes the document being transformed (file name, nesting...).
     * The path is then used to create the corresponding Word document.
     * @param {HTMLDocument} document The document
     * @param {string} url The url of the page imported
     * @param {string} html The raw html (the document is cleaned up during preprocessing)
     * @param {object} params Object containing some parameters given by the import process.
     * @return {string} The path
     */
    generateDocumentPath: ({
      // eslint-disable-next-line no-unused-vars
      document, url, html, params,
    }) => {
      let p = new URL(url).pathname;
      if (p.endsWith('/')) {
        p = `${p}index`;
      }
      return decodeURIComponent(p)
        .toLowerCase()
        .replace(/\.html$/, '')
        .replace(/[^a-z0-9/]/gm, '-');
    },
  };