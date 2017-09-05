

// left right normal
const OrzLayoutKeymap:{[key:string]:[string,string,string]} = {
	// "q": ["xa", "", ""],
	// "w": ["e", "ga", "ka"],
	// "e": ["ri", "da", "ta"],
	// "r": ["xya", "go", "ko"],
	"t": ["re", "za", "sa"]
}

const normalKeyMap = (orginKey: string, normalMapKey: string) => {
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
const rightOyaKeyMap = (orginKey: string, rightMapKey: string) => {
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
const leftOyaKeyMap = (orginKey: string, leftMapKey: string) => {
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

const keyMap = (orginKey: string, leftMapKey: string, rightMapKey: string, normalKey: string) => {
	let res: Object[] = [];
	if (normalKey != "") {
		res.push(normalKeyMap(orginKey, normalKey))
	}
	if (leftMapKey != "") {
		res.push(leftOyaKeyMap(orginKey, leftMapKey))
	}
	if (rightMapKey != "") {
		res.push(rightOyaKeyMap(orginKey, rightMapKey))
	}
	return res

}

const assignLeftOyaKey = (leftOyaKey: string = "spacebar") => {
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
const assignRightOyaKey = (rightOyaKey: string = "right_command") => {
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
const shiftOn = (shiftOnKey: string = "left_command") => {
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

const shiftOff = (shiftOffKey: string = "right_command") => {
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
	manipulators.push(shiftOn("right_command"))
	manipulators.push(assignLeftOyaKey())
	manipulators.push(assignRightOyaKey())
	for (let orginKey in OrzLayoutKeymap) {
		const [leftMapKey, rightMapKey, normalKey] = OrzLayoutKeymap[orginKey]
		manipulators.push(...keyMap(orginKey,leftMapKey, rightMapKey, normalKey))
	}
	manipulators.push(shiftOff("left_option"))
	console.log(JSON.stringify(MainTemplate(manipulators),null, "    ")) 
}

main()