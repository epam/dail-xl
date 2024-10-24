// Copy of python keywords and brackets from monaco-editor/esm/vs/basic-languages/python/python.js
export const pythonLanguage = {
  keywords: [
    // This section is the result of running
    // `import keyword; for k in sorted(keyword.kwlist + keyword.softkwlist): print("  '" + k + "',")`
    // in a Python REPL,
    // though note that the output from Python 3 is not a strict superset of the
    // output from Python 2.
    'False',
    // promoted to keyword.kwlist in Python 3
    'None',
    // promoted to keyword.kwlist in Python 3
    'True',
    // promoted to keyword.kwlist in Python 3
    '_',
    // new in Python 3.10
    'and',
    'as',
    'assert',
    'async',
    // new in Python 3
    'await',
    // new in Python 3
    'break',
    'case',
    // new in Python 3.10
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'exec',
    // Python 2, but not 3.
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'match',
    // new in Python 3.10
    'nonlocal',
    // new in Python 3
    'not',
    'or',
    'pass',
    'print',
    // Python 2, but not 3.
    'raise',
    'return',
    'try',
    'type',
    // new in Python 3.12
    'while',
    'with',
    'yield',
    'int',
    'float',
    'long',
    'complex',
    'hex',
    'abs',
    'all',
    'any',
    'apply',
    'basestring',
    'bin',
    'bool',
    'buffer',
    'bytearray',
    'callable',
    'chr',
    'classmethod',
    'cmp',
    'coerce',
    'compile',
    'complex',
    'delattr',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'execfile',
    'file',
    'filter',
    'format',
    'frozenset',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'id',
    'input',
    'intern',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'locals',
    'list',
    'map',
    'max',
    'memoryview',
    'min',
    'next',
    'object',
    'oct',
    'open',
    'ord',
    'pow',
    'print',
    'property',
    'reversed',
    'range',
    'raw_input',
    'reduce',
    'reload',
    'repr',
    'reversed',
    'round',
    'self',
    'set',
    'setattr',
    'slice',
    'sorted',
    'staticmethod',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'unichr',
    'unicode',
    'vars',
    'xrange',
    'zip',
    '__dict__',
    '__methods__',
    '__members__',
    '__class__',
    '__bases__',
    '__name__',
    '__mro__',
    '__subclasses__',
    '__init__',
    '__import__',
  ],
  brackets: [
    { open: '{', close: '}', token: 'delimiter.curly' },
    { open: '[', close: ']', token: 'delimiter.bracket' },
    { open: '(', close: ')', token: 'delimiter.parenthesis' },
  ],
};
