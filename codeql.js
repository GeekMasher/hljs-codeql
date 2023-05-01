/*
Language: CodeQL
Author: Mathew Payne
Category: common, enterprise
Website: https://codeql.github.com
*/

export default function(hljs) {
  const regex = hljs.regex;
  const RESERVED_WORDS = [
    'and',
    'any',
    'class',
    'predicate',
    'or',
    'exists',
    'none',
    'from',
    'where',
    'select'
  ];
  
  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES
  };

  
  return {
    name: 'CodeQL',
    aliases: [
      'ql',
      'qll'
    ],
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /(<\/|\?)|=>/,
    contains: [
      hljs.COMMENT(
        '/\\*\\*',
        '\\*/',
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: 'doctag',
              begin: '@[A-Za-z]+'
            }
          ]
        }
      ),
      {
        begin: /import semmel\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      // Strings
      {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [ hljs.BACKSLASH_ESCAPE ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
    ]
  };
}

