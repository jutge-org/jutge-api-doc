import YAML from 'yaml'
import { AppSidebar } from '@/components/app-sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Package, SquareFunction, Type } from 'lucide-react'
import { jutgeApiAddress } from '@/lib/utilities'
import { modules } from '@/lib/tree'

export default async function Page() {
    const response = await fetch(`${jutgeApiAddress()}/api/dir`)
    const dir = await response.json()
    const tree = modules(dir)

    return (
        <SidebarProvider>
            <AppSidebar tree={tree} />
            <SidebarInset>
                <Header />
                <Main dir={dir} />
            </SidebarInset>
        </SidebarProvider>
    )
}

function Header() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">Index</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Welcome</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}

function Main({ dir }: any) {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                <Module mod={dir} path={[]} />
            </div>
        </div>
    )
}

function Module({ mod, path }: any) {
    const header =
        path.length === 0 ? null : (
            <h1 className="py-4 flex gap-2 rounded-xlpl-4 font-semibold">
                <Package />
                {path.join('.')}
            </h1>
        )

    const models = mod.models.map((model: any) => (
        <Model key={model.name} model={model} path={path} />
    ))

    const endpoints = mod.endpoints.map((endpoint: any) => (
        <Endpoint key={endpoint.name} endpoint={endpoint} path={path} />
    ))

    const submodules = mod.modules.map((submod: any) => (
        <Module key={submod.name} mod={submod} path={path.concat(submod.name)} />
    ))

    return (
        <div id={path}>
            {header}
            <div className="pl-8">{models}</div>
            <div className="pl-8">{endpoints}</div>
            {submodules}
        </div>
    )
}

function Model({ model, path }: any) {
    const [name, data] = model
    return (
        <div className="p-4" id={`${path.join(".")}.${name}`}>
            <h2 className="font-semibold flex gap-2">
                <Type />
                {name}
            </h2>
            <pre className="text-xs pl-2 pt-2">{YAML.stringify(data, null, 4)}</pre>
        </div>
    )
}

function Endpoint({ endpoint, path }: any) {
    return (
        <div className="p-4" id={`${path.join(".")}.${endpoint.name}`}>
            <h2 className="font-semibold flex gap-2">
                <SquareFunction />
                {endpoint.name}
            </h2>
            <p>{endpoint.summary}</p>
            <p>{endpoint.description}</p>
            <h3>Input</h3>
            <pre className="text-xs pl-2 py-2">{YAML.stringify(endpoint.input, null, 4)}</pre>
            <h3>Output</h3>
            <pre className="text-xs pl-2 py-2">{YAML.stringify(endpoint.output, null, 4)}</pre>
        </div>
    )
}
