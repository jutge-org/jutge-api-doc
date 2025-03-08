import { cn } from "@/lib/utils"
import PlatformCtrlKbd from "@/components/platform-ctrl-kbd"

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
                        Use <PlatformCtrlKbd keyName="Enter" className="relative bottom-[0.06rem] mx-1" /> to run the code of the last cell.
                    </li>
                    <li>
                        Use <code>return x</code> to show <code>x</code> in the "OUTPUT" area. <code>last</code> contains the previous <code>return</code>ed value.
                    </li>
                    <li>
                        Access the Jutge client through <code>jutge</code>, which is pre-initialized
                        with a <code>new JutgeApiClient()</code> object.
                    </li>
                    <li>
                        Available functions, all <em>asynchronous</em>:
                        <ul>
                            <li >
                                <code>input(text: string)</code>: opens a modal (showing <code>text</code>) asking for a string and returns
                                it. 
                            </li>
                            <li>
                                <code>print(x: any)</code>: prints an object (do not use{" "}
                                <code>console.log</code>!).
                            </li>
                            <li>
                                <code>chart(data: Array&lt;number&gt;)</code>: charts an array of numbers (<code>data</code>).
                            </li>
                            <li>
                                <code>login()</code>: asks email and password and
                                logs the <code>jutge</code> Jutge client in.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}
