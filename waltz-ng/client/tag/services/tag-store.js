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
import {checkIsEntityRef, checkIsStringList} from "../../common/checks";


export function store($http, base) {
    const BASE = `${base}/tag`;

    const findAllTags = () => $http
        .get(BASE)
        .then(x => x.data);

    const findByTag = (tag) => $http
        .get(`${BASE}/${tag}`)
        .then(x => x.data);

    const getTagsWithUsageById = (id) => $http
        .get(`${BASE}/id/${id}`)
        .then(x => x.data);

    const findTagsByEntityRef = (ref) => $http
        .get(`${BASE}/entity/${ref.kind}/${ref.id}`)
        .then(x => x.data);

    const findTagsByEntityKind = (entityKind) => $http
        .get(`${BASE}/target-kind/${entityKind}`)
        .then(x => x.data);

    const update = (entityRef, tags = []) => {
        checkIsEntityRef(entityRef);
        checkIsStringList(tags);

        return $http
            .post(`${BASE}/entity/${entityRef.kind}/${entityRef.id}`, tags)
            .then(r => r.data);
    };

    return {
        findAllTags,
        findByTag,
        getTagsWithUsageById,
        findTagsByEntityRef,
        findTagsByEntityKind,
        update
    };
}


store.$inject = [
    '$http',
    'BaseApiUrl'
];


export const serviceName = 'TagStore';


export const TagStore_API = {
    findAllTags: {
        serviceName,
        serviceFnName: 'findAllTags',
        description: 'executes findAllTags'
    },
    findByTag: {
        serviceName,
        serviceFnName: 'findByTag',
        description: 'executes findByTag'
    },
    getTagsWithUsageById: {
        serviceName,
        serviceFnName: 'getTagsWithUsageById',
        description: 'executes getTagsWithUsageById'
    },
    findTagsByEntityRef: {
        serviceName,
        serviceFnName: 'findTagsByEntityRef',
        description: 'executes findTagsByEntityRef'
    },
    findTagsByEntityKind: {
        serviceName,
        serviceFnName: 'findTagsByEntityKind',
        description: 'executes findTagsByEntityKind'
    },
    update: {
        serviceName,
        serviceFnName: 'update',
        description: 'executes update'
    }
};

export default store;
