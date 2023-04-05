export type Solanapdas = {
  "version": "0.1.0",
  "name": "solanapdas",
  "instructions": [
    {
      "name": "createLife",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "blockhash",
          "type": "string"
        }
      ]
    },
    {
      "name": "createOrganism",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "organism",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "blockhash",
          "type": "string"
        }
      ]
    },
    {
      "name": "evolve",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "organism",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "blockhash",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "organism",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "birthdate",
            "type": "string"
          },
          {
            "name": "size",
            "type": "i128"
          },
          {
            "name": "x",
            "type": "u128"
          },
          {
            "name": "y",
            "type": "u128"
          },
          {
            "name": "index",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numOrganisms",
            "type": "i64"
          },
          {
            "name": "birthdate",
            "type": "string"
          }
        ]
      }
    }
  ]
};

export const IDL: Solanapdas = {
  "version": "0.1.0",
  "name": "solanapdas",
  "instructions": [
    {
      "name": "createLife",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "blockhash",
          "type": "string"
        }
      ]
    },
    {
      "name": "createOrganism",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "organism",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "blockhash",
          "type": "string"
        }
      ]
    },
    {
      "name": "evolve",
      "accounts": [
        {
          "name": "creator",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "organism",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "blockhash",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "organism",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "birthdate",
            "type": "string"
          },
          {
            "name": "size",
            "type": "i128"
          },
          {
            "name": "x",
            "type": "u128"
          },
          {
            "name": "y",
            "type": "u128"
          },
          {
            "name": "index",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "creator",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "numOrganisms",
            "type": "i64"
          },
          {
            "name": "birthdate",
            "type": "string"
          }
        ]
      }
    }
  ]
};
