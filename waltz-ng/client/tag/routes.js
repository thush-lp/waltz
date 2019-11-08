/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016, 2017 Waltz open source project
 * See README.md for more information
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import tagExplorerView from './tag-explorer';
import tagOverview from './pages/tag-overview';


const base = {
    url: 'tags'
};


const explorerState = {
    url: '/explorer/{tag:string}',
    views: {'content@': tagExplorerView }
};

const viewState = {
    url: '/id/{id:int}',
    views: {'content@': tagOverview }
};


function setup($stateProvider) {
    $stateProvider
        .state('main.tag', base)
        .state('main.tag.explorer', explorerState)
        .state('main.tag.overview', viewState);
}


setup.$inject = [
    '$stateProvider'
];


export default setup;