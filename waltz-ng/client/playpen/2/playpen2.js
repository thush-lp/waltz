import {termSearch} from "../../common";

const initData = {
    gridData: [],
    filteredGriData: []
};


function controller($interval) {

    const vm = Object.assign(this, initData);

    const gridData = [{
        "firstName": "Cox",
            "lastName": "Carney",
            "company": "Enormo",
            "employed": true
        }, {
        "firstName": "Lorraine",
            "lastName": "Wise",
            "company": "Comveyer",
            "employed": false
        }, {
        "firstName": "Nancy",
            "lastName": "Waters",
            "company": "Fuelton",
            "employed": false
        }];

    vm.columnDefs = [
        {field: 'firstName'},
        {field: 'lastName'},
        {field: 'company'},
        {field: 'employed'}
    ];

    const searchFields = [
        'firstName',
        'lastName',
        'company',
        'employed'
    ];

    vm.filterData = queryText => {
        vm.filteredGridData = termSearch(vm.gridData, queryText, searchFields);
    };

    vm.onGridInitialise = (e) => {
        vm.gridExporter = e.exportFn;
    };

    vm.exportWaltzGrid = () => {
        vm.gridExporter('playpen-grid-export.csv');
    };


    $interval(() => {
        vm.gridData = gridData;
        vm.filteredGridData = vm.gridData;
    }, 1500, 1);

}


controller.$inject = [
    '$interval'
];


const view = {
    template: require('./playpen2.html'),
    controller,
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {}
};


export default view;