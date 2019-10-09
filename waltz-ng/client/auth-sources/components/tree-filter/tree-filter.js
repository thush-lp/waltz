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

import template from "./tree-filter.html";
import {initialiseData} from "../../../common/index";
import {buildHierarchies, doSearch, prepareSearchNodes} from "../../../common/hierarchy-utils";
import _ from "lodash";

const bindings = {
    onFilterChange: "<",
    items: "<",
    placeholder: "@?"
};

const initialState = {
    placeholder: "Search...",
    editMode: false,
    selectedItems: [],
    expandedNodes: []
};


function prepareTree(items = []) {
    return buildHierarchies(items, false);
}


function controller() {

    const vm = initialiseData(this, initialState);

    vm.$onChanges = () => {
        const items = _.map(vm.items, d => {
            const concrete = _.isUndefined(d.concrete) ? true : d.concrete;
            return Object.assign({}, d, {concrete})
        });
        vm.searchNodes = prepareSearchNodes(items);
        vm.hierarchy = prepareTree(items);
    };

    vm.treeOptions = {
        nodeChildren: "children",
        dirSelectable: true,
        equality: (a, b) => a && b && a.id === b.id
    };

    vm.doSearch = (termStr = "") => {
        const matchingNodes = doSearch(termStr, vm.searchNodes);
        vm.hierarchy = prepareTree(matchingNodes);
    };
    vm.toggleTreeSelector = () => {
        vm.editMode = !vm.editMode;
    };
    const sortByName = (items = []) => items.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else if (a.name > b.name) {
            return 1;
        } else {
            return 0
        }
    });


    vm.onSelect = (n) => {
        if (!vm.selectedItems.map(e => e.id).includes(n.id)) {
            let oldItems = [...vm.selectedItems];
            oldItems.push(n);
            vm.expandedNodes.push(n);
            vm.selectedItems = sortByName(oldItems);
        }
        vm.onFilterChange(vm.selectedItems.map(e => e.id));
    };
    vm.removeSelected = (id) => {
        vm.selectedItems = vm.selectedItems.filter(e => e.id !== id);
        vm.onFilterChange(vm.selectedItems.map(e => e.id));
    };
    vm.isSelected = (n) => {
        return vm.selectedItems.map(e => e.id).includes(n.id)
    }
}


export const component = {
    controller,
    bindings,
    template
};


export const id = "waltzTreeFilter";
