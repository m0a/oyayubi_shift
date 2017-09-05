

// left right normal
const keyMap:{[key:string]:[string,string,string]} = {
	"q": ["xa", "", ""],
	"w": ["e", "ga", "ka"],
	"e": ["ri", "da", "ta"],
	"r": ["xya", "go", "ko"],
	"t": ["re", "za", "sa"]
}

const NormalKeyMapTemplate = (orginKey: string, normalMapKey: string) => {
	return {
		"description": `${orginKey} -> ${normalMapKey}`,
		"type": "basic",
		"from": {
			"key_code": orginKey
		},
		"to": normalMapKey.split("").map(ch => { return { "key_code": ch } }),
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
	}
}
const RightKeyMapTemplate = (orginKey: string, rightMapKey: string) => {
	return {
		"description": `${orginKey} + right_oya -> ${rightMapKey}`,
		"type": "basic",
		"from": {
			"key_code": `${orginKey}`
		},
		"to": rightMapKey.split("").map(ch => { return { "key_code": ch } }),
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
	}
}
const LeftKeyMapTemplate = (orginKey: string, leftMapKey: string) => {
	return {
		"description": `${orginKey} + left_oya -> ${leftMapKey}`,
		"type": "basic",
		"from": {
			"key_code": `${orginKey}`
		},
		"to": leftMapKey.split("").map(ch => { return { "key_code": ch } }),
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
	}
}

const KeyMapTemplate = (orginKey: string, leftMapKey: string, rightMapKey: string, normalKey: string) => {
	let res: Object[] = [];
	if (normalKey != "") {
		res.push(NormalKeyMapTemplate(orginKey, normalKey))
	}
	if (leftMapKey != "") {
		res.push(LeftKeyMapTemplate(orginKey, leftMapKey))
	}
	if (rightMapKey != "") {
		res.push(RightKeyMapTemplate(orginKey, rightMapKey))
	}
	return res

}

const assignLeftOyaTemplate = (leftOyaKey: string = "spacebar") => {
	return {
		"description": `${leftOyaKey}をleft_oyaに設定/ ${leftOyaKey}単体なら${leftOyaKey}のまま`,
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
	}
}
const assignRightOyaTemplate = (rightOyaKey: string = "right_command") => {
	return {
		"description": `${rightOyaKey}をright_oyaに設定/ ${rightOyaKey}単体なら${rightOyaKey}のまま`,
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
	}

}
const ShiftOnTemplate = (shiftOnKey: string = "left_command") => {
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
	}
}

const ShiftOffTemplate = (shiftOffKey: string = "right_command") => {
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
	}
}

const MainTemplate = (manipulators: Object[]) => {
	return {
		"title": "親指シフト設定",
		"rules": [
			{
				"description": "親指シフト設定 ORZレイアウト",
				manipulators
			}
		]
	}
}

const main = () => {
	let manipulators: Object[] = []
	manipulators.push(ShiftOnTemplate())
	manipulators.push(assignLeftOyaTemplate())
	manipulators.push(assignRightOyaTemplate())
	for (let orginKey in keyMap) {
		const [leftMapKey, rightMapKey, normalKey] = keyMap[orginKey]
		manipulators.push(...KeyMapTemplate(orginKey,leftMapKey, rightMapKey, normalKey))
	}
	manipulators.push(ShiftOffTemplate())
	console.log(JSON.stringify(MainTemplate(manipulators))) 
}

main()