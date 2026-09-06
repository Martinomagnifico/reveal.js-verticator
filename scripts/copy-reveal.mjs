import fs from 'fs-extra'

const copyRevealFiles = async () => {
  try {
    // Ensure demo directory exists
    await fs.ensureDir('demo')
    
    // Check if source directories exist
    const distExists = await fs.pathExists('node_modules/reveal.js/dist')
    const pluginExists = await fs.pathExists('node_modules/reveal.js/plugin')
    
    if (!distExists) {
      throw new Error('Source directories not found. Make sure reveal.js is installed.')
    }

    // Copy files
    await fs.copy(
      'node_modules/reveal.js/dist',
      'demo/dist',
      { overwrite: true }
    )
    // COMMENTED OUT THIS PIECE, NOT NEEDED IN R6.
    
    // await fs.copy(
    //   'node_modules/reveal.js/plugin',
    //   'demo/plugin',
    //   { overwrite: true }
    // )

    console.log('✓ Copied reveal.js files')
  } catch (err) {
    console.error('Error copying reveal.js files:', err)
    process.exit(1)
  }
}

copyRevealFiles()