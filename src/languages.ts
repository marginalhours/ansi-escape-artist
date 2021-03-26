/* 
* This file holds the definitions of the different languages available. To add a new language,
* you need:
* - An enum value in `LanguageType`
* - A `Language` instance for it
* - An entry in the `Languages` object indexed by your enum
*/
import { EscapeType } from './constants';

export enum LanguageType {
    Python = 0,
    Rust = 1,
    Golang = 2,
    JavaScript = 3,
    Julia = 4,
    C = 5,
    CPP = 6,
    Haskell = 7,
    Java = 8,
    Ruby = 9,
    Scheme = 10,
    Perl = 11
};

class EscapeSet {
    [EscapeType.Octal]: string | undefined;
    [EscapeType.Hex]: string | undefined;
    [EscapeType.Unicode]: string | undefined;

    constructor(octal: string | undefined, hex: string | undefined, unicode: string | undefined){
        this[EscapeType.Octal] = octal;
        this[EscapeType.Hex] = hex;
        this[EscapeType.Unicode] = unicode;
    }
}

class Language {
    name: string;
    escapes: EscapeSet;
    template: string;
    command: string;
    prismLanguage: string;

    constructor(name: string, escapes: EscapeSet, template: string, command: string, prismLanguage: string){
        this.name = name;
        this.escapes = escapes;
        this.template = template;
        this.command = command; 
        this.prismLanguage = prismLanguage;
    }
}

const Python = new Language(
    "Python",
    new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    `def format(s: str) -> str:\n    return f"{{PREFIX}}{s}{{SUFFIX}}"\n\nif __name__ == "__main__":\n    print(format("{{TEXT}}"))\n`,
    `$ python test.py`,
    "language-python"
);

const Rust = new Language(
    "Rust",
    new EscapeSet(undefined, String.raw`\x1b[`, String.raw`\u{001b}[`),
    `fn add_formatting(s: &str) -> String {\n    return String::from(format!("{{PREFIX}}{0}{{SUFFIX}}", s));\n}\n\nfn main() {\n    println!("{}", add_formatting("{{TEXT}}"));\n}\n`,
    `$ rustc test.rs && ./test`,
    "language-rust"
);

const GoLang = new Language(
    "Go",
    new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    `package main\n\nimport "fmt"\n\nfunc format(a string) string {\n\treturn fmt.Sprintf("{{PREFIX}}%s{{SUFFIX}}", a)\n}\n\nfunc main() {\n\tfmt.Println(format("{{TEXT}}"))\n}\n`,
    `$ go run test.go`,
    "language-go"
);

const JavaScript = new Language(
    "JavaScript (Node)",
    // JavaScript *has* Octal escapes, but not in f-strings which we use to format
    new EscapeSet(undefined, String.raw`\x1b[`, String.raw`\u001b[`),
    `const format = s => \`{{PREFIX}}\${s}{{SUFFIX}}\`\n\nconsole.log(format("{{TEXT}}"))\n`,
    `$ node test.js`,
    "language-javascript"
);

const JuliaLang = new Language(
    "Julia",
    new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    `function format(s)\n    return "{{PREFIX}}$s{{SUFFIX}}"\nend\n\nprintln(format("{{TEXT}}"))\n`,
    `$ julia test.jl`,
    "language-julia"
);

const CLang = new Language(
    "C",
    new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    `#include <stdio.h>\n\nint main(){\n    printf("{{PREFIX}}%s{{SUFFIX}}\\n", "{{TEXT}}");\n}\n`,
    `$ gcc test.c -o test && ./test`,
    "language-c"
);

const CPPLang = new Language(
    "C++",
    new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    `#include <iostream>\n#include <string>\n\nstd::string format(const std::string & s){\n    return "{{PREFIX}}" + s + "{{SUFFIX}}";\n}\n\nint main() {\n        std::cout << format("{{TEXT}}") << std::endl;\n}\n`,
    `$ g++ test.cpp -o test && ./test`,
    "language-cpp"  
);

const HaskellLang = new Language(
    "Haskell",
    new EscapeSet(String.raw`\o033[`, String.raw`\x1b[`, undefined),
    `format :: String -> String\nformat s = "{{PREFIX}}" ++ s ++ "{{SUFFIX}}"\n\nmain :: IO ()\nmain = putStrLn (format "{{TEXT}}")\n`,
    `$ ghc test.hs -o test && ./test`,
    "language-haskell"
);

const JavaLang = new Language(
    "Java",
    // Java apparently has hex escapes, but they don't work for me 
    new EscapeSet(String.raw`\33[`, undefined, String.raw`\u001b[`),
    `class Test {\n\n    private static String format(String s){\n        return String.format("{{PREFIX}}%s{{SUFFIX}}", s);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(format("{{TEXT}}"));\n    }\n\n}\n`,
    `java test.java`,
    "language-java"
);

const RubyLang = new Language(
    "Ruby",
    new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    `def format(s)\n  return "{{PREFIX}}#{s}{{SUFFIX}}"\nend\n\nputs format("{{TEXT}}")`,
    `$ ruby test.rb`,
    "language-ruby"
);

const SchemeLang = new Language(
    "MIT Scheme",
    new EscapeSet(String.raw`\033[`, String.raw`\x1B;[`, undefined),
    `(define (format s)\n  (string-append "{{PREFIX}}" s "{{SUFFIX}}"))\n\n(begin\n  (display (format "{{TEXT}}"))\n  (newline))\n`,
    `$ scheme --quiet < test.scm`,
    "language-scheme"
);

const PerlLang = new Language(
    "Perl",
    new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    `sub Format {\n  return "{{PREFIX}}$_[0]{{SUFFIX}}";\n}\n\n$str = Format("{{TEXT}}\\n");\nprint $str`,
    "$ perl test.pl",
    "language-perl"
);

export const LANGUAGES = {
    [LanguageType.Python]: Python,
    [LanguageType.Rust]: Rust,
    [LanguageType.Golang]: GoLang,
    [LanguageType.JavaScript]: JavaScript,
    [LanguageType.Julia]: JuliaLang,
    [LanguageType.C]: CLang,
    [LanguageType.CPP]: CPPLang,
    [LanguageType.Haskell]: HaskellLang,
    [LanguageType.Java]: JavaLang,
    [LanguageType.Ruby]: RubyLang,
    [LanguageType.Scheme]: SchemeLang,
    [LanguageType.Perl]: PerlLang
};
