import { cn } from "@/lib/utils"

export default function PlaygroundHelp() {
    return (
        <div>
            <p className="text-xs pb-1.5 text-muted-foreground">HELP</p>
            <div
                className={cn(
                    "max-w-none text-sm px-2 py-1.5 border-spacing-2 rounded-lg bg-muted",
                    "prose dark:prose-invert prose-code:before:hidden prose-code:after:hidden",
                )}
            >
                <ul>
                    <li>
                        Use <kbd className="bg-background">⌘⏎</kbd> or{" "}
                        <kbd className="bg-background">^⏎</kbd> to run the code of the last cell.
                    </li>
                    <li>
                        Use <code>return</code> to return a result and use <code>last</code> to use
                        the last returned value.
                    </li>
                    <li>
                        Available objects:
                        <ul>
                            <li>
                                <code>j</code>: variable with a <code>new JutgeApiClient()</code>{" "}
                                object.
                            </li>
                            <li>
                                <code>input</code>: async function that reads a string and returns
                                it.
                            </li>
                            <li>
                                <code>print</code>: async function that prints an object (do not use{" "}
                                <code>console.log</code>!).
                            </li>
                            <li>
                                <code>chart</code>: async function that charts a list of numbers.
                            </li>
                            <li>
                                <code>login</code>: async function that asks email and password and
                                logs the <code>j</code> Jutge client in.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}
