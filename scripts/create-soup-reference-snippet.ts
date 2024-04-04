import * as B from "@tscircuit/builder"
import { zodToJsonSchema } from "zod-to-json-schema"
import { pascalCase } from "change-case"
import * as fs from "fs"
import { JSONSchemaFaker } from "json-schema-faker"
import prettier from "prettier"

const default_values: Record<string, any> = {
  source_component_id: "source_component_1",
  voltage: "5V",
  current: "1A",
  resistance: "1k",
  capacitance: "1uF",
  inductance: "1mH",
  width: "5mm",
  height: "5mm",
  frequency: "1kHz",
  duty_cycle: "50%",
  power: "10W",
  temperature: "25C",
  time: "60s",
  length: "1m",
  x: "3mm",
  y: "1mm",
  pcb_x: "-2mm",
  pcb_y: "0mm",
  pcb_rotation: "90deg",
  x1: "1mm",
  y1: "1mm",
  x2: "2mm",
  y2: "2mm",
  port_labels: {
    1: "VCC",
    2: "GND",
    3: "OUT",
  },
  port_arrangement: {
    left_size: 3,
    right_size: 3,
  },
  rotation: "90deg",
}

// Patch to make JSONSchemaFaker work
// https://github.com/json-schema-faker/json-schema-faker/issues/800
;(global as any).location = new URL(import.meta.url)

const categories = ["source", "schematic", "pcb"]

type JSONSchema = any

const sections: Array<{
  category: string
  element_name: string
  markdown: string
}> = []

function replaceDefaultValues(
  example_json: any,
  category: string,
  element_name: string
) {
  for (const key of Object.keys(example_json)) {
    if (key.endsWith("_id")) {
      default_values[key] = key.replace("_id", "_1")
    }
    if (key === "name") {
      example_json.name =
        (example_json.ftype ?? element_name)
          .replace("simple_", "")
          .replace(`${category}_`, "")[0]
          .toUpperCase() + "1"
    }
    if (default_values[key]) {
      example_json[key] = default_values[key]
    }
    if (typeof example_json[key] === "object") {
      replaceDefaultValues(example_json[key], category, element_name)
    }
  }
  return example_json
}

function jsonSchemaToMarkdownTable(schema: any): string {
  // Start the markdown table with headers
  let markdownTable = `| Property | Type | Required | Description |\n|---|---|---|---|\n`

  const properties = schema.properties
  const requiredProperties = new Set(schema.required)

  for (const propertyName in properties) {
    let property = properties[propertyName]
    property = {
      ...properties[property?.$ref?.split("/")?.pop()],
      ...property,
    }
    const propertyType = Array.isArray(property.type)
      ? property.type.join(", ")
      : property.type
    const isRequired = requiredProperties.has(propertyName) ? "Yes" : "No"
    const description = property.description ?? ""

    // Append each property to the markdown table
    markdownTable += `| ${propertyName} | ${propertyType} | ${isRequired} | ${description} |\n`
  }

  return markdownTable
}

for (const element_name of Object.keys(B.Soup)) {
  const element = (B.Soup as any)[element_name]
  const schema: any = zodToJsonSchema(element)
  const element_type: string | null = schema?.properties?.type?.const
  const category = categories.find((c) => element_type?.startsWith(c)) ?? "misc"

  let example_json: any
  try {
    if (default_values[element_name]) {
      example_json = default_values[element_name]
    } else {
      example_json = await JSONSchemaFaker.resolve(schema as any)
      replaceDefaultValues(example_json, category, element_name)
    }

    example_json = JSON.stringify(example_json, null, 2)
  } catch (e) {}

  let markdownTable
  if (schema.properties) {
    try {
      markdownTable = jsonSchemaToMarkdownTable(schema)
    } catch (e) {}
  }

  let markdown = `

### \`${element_name}\`

${schema.description ?? ""}

\`\`\`json
${example_json}
\`\`\`

${markdownTable ?? ""}
  
  `.trim()

  const section = {
    category,
    element_name,
    markdown,
  }
  sections.push(section)
}

const full_markdown_lines: string[] = []
for (const category of categories.concat(["misc"])) {
  full_markdown_lines.push(`## ${pascalCase(category)}\n`)
  for (const section of sections.filter((s) => s.category === category)) {
    full_markdown_lines.push(section.markdown)
  }
}

// console.log(full_markdown_lines.join("\n\n"))

fs.writeFileSync(
  "./snippets/soup-reference.mdx",
  await prettier.format(full_markdown_lines.join("\n"), {
    parser: "mdx",
  })
)

// const handled_elements: string[] = []

// for (const element of Object.keys(element_schemas)) {
// }

// console.log(zodToJsonSchema(B.Soup.source_simple_resistor))
