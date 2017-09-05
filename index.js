"use strict";
// left right normal
var keyMap = {
    "q": ["xa", "", ""],
    "w": ["e", "ga", "ka"],
    "e": ["ri", "da", "ta"],
    "r": ["xya", "go", "ko"],
    "t": ["re", "za", "sa"]
};
var NormalKeyMapTemplate = function (orginKey, normalMapKey) {
    return {
        "description": orginKey + " -> " + normalMapKey,
        "type": "basic",
        "from": {
            "key_code": orginKey
        },
        "to": normalMapKey.split("").map(function (ch) { return { "key_code": ch }; }),
        "conditions": [
            {
                "name": "japanese_input",
                "type": "variable_if",
                "value": 1
            },
            {
                "name": "left_oya",
                "type": "variable_if",
                "value": 0
            },
            {
                "name": "right_oya",
                "type": "variable_if",
                "value": 0
            }
        ]
    };
};
var RightKeyMapTemplate = function (orginKey, rightMapKey) {
    return {
        "description": orginKey + " + right_oya -> " + rightMapKey,
        "type": "basic",
        "from": {
            "key_code": "" + orginKey
        },
        "to": rightMapKey.split("").map(function (ch) { return { "key_code": ch }; }),
        "conditions": [
            {
                "name": "japanese_input",
                "type": "variable_if",
                "value": 1
            },
            {
                "name": "left_oya",
                "type": "variable_if",
                "value": 0
            },
            {
                "name": "right_oya",
                "type": "variable_if",
                "value": 1
            }
        ]
    };
};
var LeftKeyMapTemplate = function (orginKey, leftMapKey) {
    return {
        "description": orginKey + " + left_oya -> " + leftMapKey,
        "type": "basic",
        "from": {
            "key_code": "" + orginKey
        },
        "to": leftMapKey.split("").map(function (ch) { return { "key_code": ch }; }),
        "conditions": [
            {
                "name": "japanese_input",
                "type": "variable_if",
                "value": 1
            },
            {
                "name": "left_oya",
                "type": "variable_if",
                "value": 1
            },
            {
                "name": "right_oya",
                "type": "variable_if",
                "value": 0
            }
        ]
    };
};
var KeyMapTemplate = function (orginKey, leftMapKey, rightMapKey, normalKey) {
    var res = [];
    if (normalKey != "") {
        res.push(NormalKeyMapTemplate(orginKey, normalKey));
    }
    if (leftMapKey != "") {
        res.push(LeftKeyMapTemplate(orginKey, leftMapKey));
    }
    if (rightMapKey != "") {
        res.push(RightKeyMapTemplate(orginKey, rightMapKey));
    }
    return res;
};
var assignLeftOyaTemplate = function (leftOyaKey) {
    if (leftOyaKey === void 0) { leftOyaKey = "spacebar"; }
    return {
        "description": leftOyaKey + "\u3092left_oya\u306B\u8A2D\u5B9A/ " + leftOyaKey + "\u5358\u4F53\u306A\u3089" + leftOyaKey + "\u306E\u307E\u307E",
        "type": "basic",
        "from": {
            "key_code": leftOyaKey,
            "modifiers": {
                "optional": [
                    "any"
                ]
            }
        },
        "to": [
            {
                "set_variable": {
                    "name": "left_oya",
                    "value": 1
                }
            }
        ],
        "to_after_key_up": [
            {
                "set_variable": {
                    "name": "left_oya",
                    "value": 0
                }
            }
        ],
        "to_if_alone": [
            {
                "key_code": leftOyaKey
            },
            {
                "set_variable": {
                    "name": "left_oya",
                    "value": 0
                }
            }
        ],
        "conditions": [
            {
                "name": "japanese_input",
                "type": "variable_if",
                "value": 1
            }
        ]
    };
};
var assignRightOyaTemplate = function (rightOyaKey) {
    if (rightOyaKey === void 0) { rightOyaKey = "right_command"; }
    return {
        "description": rightOyaKey + "\u3092right_oya\u306B\u8A2D\u5B9A/ " + rightOyaKey + "\u5358\u4F53\u306A\u3089" + rightOyaKey + "\u306E\u307E\u307E",
        "type": "basic",
        "from": {
            "key_code": rightOyaKey,
            "modifiers": {
                "optional": [
                    "any"
                ]
            }
        },
        "to": [
            {
                "set_variable": {
                    "name": "right_oya",
                    "value": 1
                }
            }
        ],
        "to_after_key_up": [
            {
                "set_variable": {
                    "name": "right_oya",
                    "value": 0
                }
            }
        ],
        "to_if_alone": [
            {
                "key_code": rightOyaKey
            },
            {
                "set_variable": {
                    "name": "right_oya",
                    "value": 0
                }
            }
        ],
        "conditions": [
            {
                "name": "japanese_input",
                "type": "variable_if",
                "value": 1
            }
        ]
    };
};
var ShiftOnTemplate = function (shiftOnKey) {
    if (shiftOnKey === void 0) { shiftOnKey = "left_command"; }
    return {
        "description": "親指シフト有効化",
        "from": {
            "key_code": shiftOnKey
        },
        "to": [
            {
                "key_code": shiftOnKey
            }
        ],
        "to_if_alone": [
            {
                "key_code": "japanese_kana"
            },
            {
                "set_variable": {
                    "name": "japanese_input",
                    "value": 1
                }
            }
        ],
        "type": "basic"
    };
};
var ShiftOffTemplate = function (shiftOffKey) {
    if (shiftOffKey === void 0) { shiftOffKey = "right_command"; }
    return {
        "description": "親指シフト無効化",
        "from": {
            "key_code": shiftOffKey
        },
        "to": [
            {
                "key_code": shiftOffKey
            }
        ],
        "to_if_alone": [
            {
                "key_code": "japanese_eisuu"
            },
            {
                "set_variable": {
                    "name": "japanese_input",
                    "value": 0
                }
            }
        ],
        "type": "basic"
    };
};
var MainTemplate = function (manipulators) {
    return {
        "title": "親指シフト設定",
        "rules": [
            {
                "description": "親指シフト設定 ORZレイアウト",
                manipulators: manipulators
            }
        ]
    };
};
var main = function () {
    var manipulators = [];
    manipulators.push(ShiftOnTemplate());
    manipulators.push(assignLeftOyaTemplate());
    manipulators.push(assignRightOyaTemplate());
    for (var orginKey in keyMap) {
        var _a = keyMap[orginKey], leftMapKey = _a[0], rightMapKey = _a[1], normalKey = _a[2];
        manipulators.push.apply(manipulators, KeyMapTemplate(orginKey, leftMapKey, rightMapKey, normalKey));
    }
    manipulators.push(ShiftOffTemplate());
    console.log(JSON.stringify(MainTemplate(manipulators)));
};
main();
