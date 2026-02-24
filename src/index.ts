import { CommandsRegistry, initCommandsRegistry, registerCommand, runCommand } from "./CommandHandler";
import { parseCliArgs } from "./utilities";


async function main() {

  const registry = initCommandsRegistry();


  const {cmdName, cmdArgs} = parseCliArgs(process.argv);

  try{

    
    await runCommand(registry, cmdName, ...cmdArgs);

  }catch(err: unknown){

    console.error(`${err}`);
    process.exit(1);
  }

  process.exit(0);
}

main();




