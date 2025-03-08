import PlatformCtrlKbd from "@/components/platform-ctrl-kbd"
import TextWidth from "@/components/text-width"
import { cn } from "@/lib/utils"

const functionMetadata = [
    ["input(text: string)", "Opens a modal asking for a string and returns it."],
    ["print(x: any)", "Prints an object."],
    ["chart(data: Array<number>)", "Charts an array of numbers."],
    ["login()", "Asks email and password and logs the Jutge client in."],
]

export default function PlaygroundHelp() {
    return (
        <div>
            <p className="text-xs mb-2">HELP</p>
            <div
                className={cn(
                    "max-w-none text-sm px-4 py-3.5 rounded-md bg-muted",
                    "prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden",
                )}
            >
                <ul className="m-0 flex flex-col gap-1 *:m-0 *:pl-0 pl-4">
                    <li>
                        Use{" "}
                        <PlatformCtrlKbd
                            keyName="Enter"
                            className="relative bottom-[0.06rem] mx-1 bg-accent text-white"
                        />{" "}
                        to run the code in a cell.
                    </li>
                    <li>
                        Access the Jutge client through <code>jutge</code>, which is pre-initialized
                        with a <code>new JutgeApiClient()</code> object.
                    </li>
                    <li>
                        Use &quot;<code>return x</code>&quot; to show <code>x</code> in the OUTPUT
                        area. &quot;<code>last</code>&quot; contains the previous{" "}
                        <code>return</code>ed value.
                    </li>
                </ul>
                <p className="mt-4 mb-2">
                    Available functions, all <em>asynchronous</em>:
                </p>
                <table className="m-0 border-t border-b border-black border-opacity-30">
                    <tbody>
                        {functionMetadata.map(([name, description]) => (
                            <tr
                                key={name}
                                className="border-b border-black border-opacity-30 h-min leading-3"
                            >
                                <td>
                                    <code className="text-[.75rem]">{name}</code>
                                </td>
                                <td>{description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
