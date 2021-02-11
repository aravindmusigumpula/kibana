/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { exportSavedObjectsToStream } from './get_sorted_objects_for_export';
import { savedObjectsClientMock } from '../service/saved_objects_client.mock';
import { Readable } from 'stream';
import { createPromiseFromStreams, createConcatStream } from '@kbn/utils';

async function readStreamToCompletion(stream: Readable) {
  return createPromiseFromStreams([stream, createConcatStream([])]);
}

describe('getSortedObjectsForExport()', () => {
  const savedObjectsClient = savedObjectsClientMock.create();

  afterEach(() => {
    savedObjectsClient.find.mockReset();
    savedObjectsClient.bulkGet.mockReset();
    savedObjectsClient.create.mockReset();
    savedObjectsClient.bulkCreate.mockReset();
    savedObjectsClient.delete.mockReset();
    savedObjectsClient.get.mockReset();
    savedObjectsClient.update.mockReset();
  });

  test('exports selected types and sorts them', async () => {
    savedObjectsClient.find.mockResolvedValueOnce({
      total: 2,
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          score: 1,
          references: [
            {
              name: 'name',
              type: 'index-pattern',
              id: '1',
            },
          ],
        },
        {
          id: '1',
          type: 'index-pattern',
          attributes: {},
          score: 1,
          references: [],
        },
      ],
      per_page: 1,
      page: 0,
    });
    const exportStream = await exportSavedObjectsToStream({
      savedObjectsClient,
      exportSizeLimit: 500,
      types: ['index-pattern', 'search'],
    });

    const response = await readStreamToCompletion(exportStream);

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {},
          "id": "1",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {},
          "id": "2",
          "references": Array [
            Object {
              "id": "1",
              "name": "name",
              "type": "index-pattern",
            },
          ],
          "type": "search",
        },
        Object {
          "exportedCount": 2,
          "missingRefCount": 0,
          "missingReferences": Array [],
        },
      ]
    `);
    expect(savedObjectsClient.find).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            Object {
              "hasReference": undefined,
              "hasReferenceOperator": undefined,
              "namespaces": undefined,
              "perPage": 500,
              "search": undefined,
              "type": Array [
                "index-pattern",
                "search",
              ],
            },
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": Promise {},
          },
        ],
      }
    `);
  });

  test('omits the `namespaces` property from the export', async () => {
    savedObjectsClient.find.mockResolvedValueOnce({
      total: 2,
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          namespaces: ['foo', 'bar'],
          score: 0,
          references: [
            {
              name: 'name',
              type: 'index-pattern',
              id: '1',
            },
          ],
        },
        {
          id: '1',
          type: 'index-pattern',
          attributes: {},
          namespaces: ['foo', 'bar'],
          score: 0,
          references: [],
        },
      ],
      per_page: 1,
      page: 0,
    });
    const exportStream = await exportSavedObjectsToStream({
      savedObjectsClient,
      exportSizeLimit: 500,
      types: ['index-pattern', 'search'],
    });

    const response = await readStreamToCompletion(exportStream);

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {},
          "id": "1",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {},
          "id": "2",
          "references": Array [
            Object {
              "id": "1",
              "name": "name",
              "type": "index-pattern",
            },
          ],
          "type": "search",
        },
        Object {
          "exportedCount": 2,
          "missingRefCount": 0,
          "missingReferences": Array [],
        },
      ]
    `);
    expect(savedObjectsClient.find).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            Object {
              "hasReference": undefined,
              "hasReferenceOperator": undefined,
              "namespaces": undefined,
              "perPage": 500,
              "search": undefined,
              "type": Array [
                "index-pattern",
                "search",
              ],
            },
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": Promise {},
          },
        ],
      }
    `);
  });

  test('exclude export details if option is specified', async () => {
    savedObjectsClient.find.mockResolvedValueOnce({
      total: 2,
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          score: 1,
          references: [
            {
              name: 'name',
              type: 'index-pattern',
              id: '1',
            },
          ],
        },
        {
          id: '1',
          type: 'index-pattern',
          attributes: {},
          score: 1,
          references: [],
        },
      ],
      per_page: 1,
      page: 0,
    });
    const exportStream = await exportSavedObjectsToStream({
      savedObjectsClient,
      exportSizeLimit: 500,
      types: ['index-pattern', 'search'],
      excludeExportDetails: true,
    });

    const response = await readStreamToCompletion(exportStream);

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {},
          "id": "1",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {},
          "id": "2",
          "references": Array [
            Object {
              "id": "1",
              "name": "name",
              "type": "index-pattern",
            },
          ],
          "type": "search",
        },
      ]
    `);
  });

  test('exports selected types with search string when present', async () => {
    savedObjectsClient.find.mockResolvedValueOnce({
      total: 2,
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          score: 1,
          references: [
            {
              name: 'name',
              type: 'index-pattern',
              id: '1',
            },
          ],
        },
        {
          id: '1',
          type: 'index-pattern',
          attributes: {},
          score: 1,
          references: [],
        },
      ],
      per_page: 1,
      page: 0,
    });
    const exportStream = await exportSavedObjectsToStream({
      savedObjectsClient,
      exportSizeLimit: 500,
      types: ['index-pattern', 'search'],
      search: 'foo',
    });

    const response = await readStreamToCompletion(exportStream);

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {},
          "id": "1",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {},
          "id": "2",
          "references": Array [
            Object {
              "id": "1",
              "name": "name",
              "type": "index-pattern",
            },
          ],
          "type": "search",
        },
        Object {
          "exportedCount": 2,
          "missingRefCount": 0,
          "missingReferences": Array [],
        },
      ]
    `);
    expect(savedObjectsClient.find).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            Object {
              "hasReference": undefined,
              "hasReferenceOperator": undefined,
              "namespaces": undefined,
              "perPage": 500,
              "search": "foo",
              "type": Array [
                "index-pattern",
                "search",
              ],
            },
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": Promise {},
          },
        ],
      }
    `);
  });

  test('exports selected types with references when present', async () => {
    savedObjectsClient.find.mockResolvedValueOnce({
      total: 1,
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          score: 1,
          references: [
            {
              name: 'name',
              type: 'index-pattern',
              id: '1',
            },
          ],
        },
      ],
      per_page: 1,
      page: 0,
    });
    const exportStream = await exportSavedObjectsToStream({
      savedObjectsClient,
      exportSizeLimit: 500,
      types: ['index-pattern', 'search'],
      hasReference: [
        {
          id: '1',
          type: 'index-pattern',
        },
      ],
    });

    const response = await readStreamToCompletion(exportStream);

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {},
          "id": "2",
          "references": Array [
            Object {
              "id": "1",
              "name": "name",
              "type": "index-pattern",
            },
          ],
          "type": "search",
        },
        Object {
          "exportedCount": 1,
          "missingRefCount": 0,
          "missingReferences": Array [],
        },
      ]
    `);
    expect(savedObjectsClient.find).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            Object {
              "hasReference": Array [
                Object {
                  "id": "1",
                  "type": "index-pattern",
                },
              ],
              "hasReferenceOperator": "OR",
              "namespaces": undefined,
              "perPage": 500,
              "search": undefined,
              "type": Array [
                "index-pattern",
                "search",
              ],
            },
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": Promise {},
          },
        ],
      }
    `);
  });

  test('exports from the provided namespace when present', async () => {
    savedObjectsClient.find.mockResolvedValueOnce({
      total: 2,
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          score: 1,
          references: [
            {
              name: 'name',
              type: 'index-pattern',
              id: '1',
            },
          ],
        },
        {
          id: '1',
          type: 'index-pattern',
          attributes: {},
          score: 1,
          references: [],
        },
      ],
      per_page: 1,
      page: 0,
    });
    const exportStream = await exportSavedObjectsToStream({
      savedObjectsClient,
      exportSizeLimit: 500,
      types: ['index-pattern', 'search'],
      namespace: 'foo',
    });

    const response = await readStreamToCompletion(exportStream);

    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {},
          "id": "1",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {},
          "id": "2",
          "references": Array [
            Object {
              "id": "1",
              "name": "name",
              "type": "index-pattern",
            },
          ],
          "type": "search",
        },
        Object {
          "exportedCount": 2,
          "missingRefCount": 0,
          "missingReferences": Array [],
        },
      ]
    `);
    expect(savedObjectsClient.find).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            Object {
              "hasReference": undefined,
              "hasReferenceOperator": undefined,
              "namespaces": Array [
                "foo",
              ],
              "perPage": 500,
              "search": undefined,
              "type": Array [
                "index-pattern",
                "search",
              ],
            },
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": Promise {},
          },
        ],
      }
    `);
  });

  test('export selected types throws error when exceeding exportSizeLimit', async () => {
    savedObjectsClient.find.mockResolvedValueOnce({
      total: 2,
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          score: 1,
          references: [
            {
              type: 'index-pattern',
              name: 'name',
              id: '1',
            },
          ],
        },
        {
          id: '1',
          type: 'index-pattern',
          attributes: {},
          score: 1,
          references: [],
        },
      ],
      per_page: 1,
      page: 0,
    });
    await expect(
      exportSavedObjectsToStream({
        savedObjectsClient,
        exportSizeLimit: 1,
        types: ['index-pattern', 'search'],
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"Can't export more than 1 objects"`);
  });

  test('sorts objects within type', async () => {
    savedObjectsClient.find.mockResolvedValueOnce({
      total: 3,
      per_page: 10000,
      page: 1,
      saved_objects: [
        {
          id: '3',
          type: 'index-pattern',
          attributes: {
            name: 'baz',
          },
          score: 1,
          references: [],
        },
        {
          id: '1',
          type: 'index-pattern',
          attributes: {
            name: 'foo',
          },
          score: 1,
          references: [],
        },
        {
          id: '2',
          type: 'index-pattern',
          attributes: {
            name: 'bar',
          },
          score: 1,
          references: [],
        },
      ],
    });
    const exportStream = await exportSavedObjectsToStream({
      exportSizeLimit: 10000,
      savedObjectsClient,
      types: ['index-pattern'],
    });
    const response = await readStreamToCompletion(exportStream);
    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {
            "name": "foo",
          },
          "id": "1",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {
            "name": "bar",
          },
          "id": "2",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {
            "name": "baz",
          },
          "id": "3",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "exportedCount": 3,
          "missingRefCount": 0,
          "missingReferences": Array [],
        },
      ]
    `);
  });

  test('exports selected objects and sorts them', async () => {
    savedObjectsClient.bulkGet.mockResolvedValueOnce({
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          references: [
            {
              id: '1',
              name: 'name',
              type: 'index-pattern',
            },
          ],
        },
        {
          id: '1',
          type: 'index-pattern',
          attributes: {},
          references: [],
        },
      ],
    });
    const exportStream = await exportSavedObjectsToStream({
      exportSizeLimit: 10000,
      savedObjectsClient,
      objects: [
        {
          type: 'index-pattern',
          id: '1',
        },
        {
          type: 'search',
          id: '2',
        },
      ],
    });
    const response = await readStreamToCompletion(exportStream);
    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {},
          "id": "1",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {},
          "id": "2",
          "references": Array [
            Object {
              "id": "1",
              "name": "name",
              "type": "index-pattern",
            },
          ],
          "type": "search",
        },
        Object {
          "exportedCount": 2,
          "missingRefCount": 0,
          "missingReferences": Array [],
        },
      ]
    `);
    expect(savedObjectsClient.bulkGet).toMatchInlineSnapshot(`
            [MockFunction] {
              "calls": Array [
                Array [
                  Array [
                    Object {
                      "id": "1",
                      "type": "index-pattern",
                    },
                    Object {
                      "id": "2",
                      "type": "search",
                    },
                  ],
                  Object {
                    "namespace": undefined,
                  },
                ],
              ],
              "results": Array [
                Object {
                  "type": "return",
                  "value": Promise {},
                },
              ],
            }
        `);
  });

  test('modifies return results to redact `namespaces` attribute', async () => {
    const createSavedObject = (obj: any) => ({ ...obj, attributes: {}, references: [] });
    savedObjectsClient.bulkGet.mockResolvedValueOnce({
      saved_objects: [
        createSavedObject({ type: 'multi', id: '1', namespaces: ['foo'] }),
        createSavedObject({ type: 'multi', id: '2', namespaces: ['bar'] }),
        createSavedObject({ type: 'other', id: '3' }),
      ],
    });
    const exportStream = await exportSavedObjectsToStream({
      exportSizeLimit: 10000,
      savedObjectsClient,
      objects: [
        { type: 'multi', id: '1' },
        { type: 'multi', id: '2' },
        { type: 'other', id: '3' },
      ],
    });
    const response = await readStreamToCompletion(exportStream);
    expect(response).toEqual([
      createSavedObject({ type: 'multi', id: '1' }),
      createSavedObject({ type: 'multi', id: '2' }),
      createSavedObject({ type: 'other', id: '3' }),
      expect.objectContaining({ exportedCount: 3 }),
    ]);
  });

  test('includes nested dependencies when passed in', async () => {
    savedObjectsClient.bulkGet.mockResolvedValueOnce({
      saved_objects: [
        {
          id: '2',
          type: 'search',
          attributes: {},
          references: [
            {
              type: 'index-pattern',
              name: 'name',
              id: '1',
            },
          ],
        },
      ],
    });
    savedObjectsClient.bulkGet.mockResolvedValueOnce({
      saved_objects: [
        {
          id: '1',
          type: 'index-pattern',
          attributes: {},
          references: [],
        },
      ],
    });
    const exportStream = await exportSavedObjectsToStream({
      exportSizeLimit: 10000,
      savedObjectsClient,
      objects: [
        {
          type: 'search',
          id: '2',
        },
      ],
      includeReferencesDeep: true,
    });
    const response = await readStreamToCompletion(exportStream);
    expect(response).toMatchInlineSnapshot(`
      Array [
        Object {
          "attributes": Object {},
          "id": "1",
          "references": Array [],
          "type": "index-pattern",
        },
        Object {
          "attributes": Object {},
          "id": "2",
          "references": Array [
            Object {
              "id": "1",
              "name": "name",
              "type": "index-pattern",
            },
          ],
          "type": "search",
        },
        Object {
          "exportedCount": 2,
          "missingRefCount": 0,
          "missingReferences": Array [],
        },
      ]
    `);
    expect(savedObjectsClient.bulkGet).toMatchInlineSnapshot(`
            [MockFunction] {
              "calls": Array [
                Array [
                  Array [
                    Object {
                      "id": "2",
                      "type": "search",
                    },
                  ],
                  Object {
                    "namespace": undefined,
                  },
                ],
                Array [
                  Array [
                    Object {
                      "id": "1",
                      "type": "index-pattern",
                    },
                  ],
                  Object {
                    "namespace": undefined,
                  },
                ],
              ],
              "results": Array [
                Object {
                  "type": "return",
                  "value": Promise {},
                },
                Object {
                  "type": "return",
                  "value": Promise {},
                },
              ],
            }
        `);
  });

  test('export selected objects throws error when exceeding exportSizeLimit', async () => {
    const exportOpts = {
      exportSizeLimit: 1,
      savedObjectsClient,
      objects: [
        {
          type: 'index-pattern',
          id: '1',
        },
        {
          type: 'search',
          id: '2',
        },
      ],
    };
    await expect(exportSavedObjectsToStream(exportOpts)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Can't export more than 1 objects"`
    );
  });

  test('rejects when neither type nor objects paramaters are passed in', () => {
    const exportOpts = {
      exportSizeLimit: 1,
      savedObjectsClient,
      types: undefined,
      objects: undefined,
    };

    expect(exportSavedObjectsToStream(exportOpts)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Either \`type\` or \`objects\` are required."`
    );
  });

  test('rejects when both objects and search are passed in', () => {
    const exportOpts = {
      exportSizeLimit: 1,
      savedObjectsClient,
      objects: [{ type: 'index-pattern', id: '1' }],
      search: 'foo',
    };

    expect(exportSavedObjectsToStream(exportOpts)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Can't specify both \\"search\\" and \\"objects\\" properties when exporting"`
    );
  });

  test('rejects when both objects and references are passed in', () => {
    const exportOpts = {
      exportSizeLimit: 1,
      savedObjectsClient,
      objects: [{ type: 'index-pattern', id: '1' }],
      hasReference: [{ type: 'index-pattern', id: '1' }],
    };

    expect(exportSavedObjectsToStream(exportOpts)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Can't specify both \\"references\\" and \\"objects\\" properties when exporting"`
    );
  });
});