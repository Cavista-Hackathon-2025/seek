'use client'
import { Input } from '../ui/input'
import { searchProductFormDef, searchProductValidationSchema } from '@/models/validations/searchproduct.validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { useProductStore } from '@/store/product.store'
import { ProductServices } from '@/services/product.services'
import { LoaderIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SearchProduct = () => {
    const { setProduct, setError, loading, setLoading, product } = useProductStore();

    const form = useForm<searchProductFormDef>({
        resolver: zodResolver(searchProductValidationSchema),
        defaultValues: {
            product: "",
        },
    })
    const router = useRouter();
    async function onSubmit(values: searchProductFormDef) {
        console.log(values);
        setError("");
        setLoading(true);
        try {
            // const userId = "677088ed4b1b61e1808a75f6"; 
            const product = values.product;
            let response;
            // response = await ProductServices.SearchProductService({ product });
            // setProduct(response.data.shorturl);
            // console.log(response);
            router.push("/products/cream");
            form.reset();
            setLoading(false);
        } catch {
            setError("Error getting product");
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative mt-[46px]">
                    <Image src='/assets/file.svg' alt='file' width={13} height={18} className='absolute top-[26px]  left-[25px] my-auto' />
                    <FormField
                        control={form.control}
                        name="product"

                        render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <Input placeholder="Search for a Product" {...field} className="border-1 border-[#E2E2E4] py-[21px] px-[25px] pl-[60px] text-[16px]/[21px] h-full md:min-w-[771px] min-w-full rounded-[48px] text-black" />
                                </FormControl>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <div className='flex items-center gap-3 absolute right-[31px]    top-0 bottom-0 my-auto  text-base font-semibold  '>
                        <Image src='/assets/voice.svg' alt='voice' width={16} height={16} className='' />
                        <Button type="submit" className="p-0 rounded-[48px] hover:drop-shadow-[10px_9px_22px_rgba(20,78,227,0.38)]" >
                            {loading ? <LoaderIcon className="animate-spin" /> : <div className='p-[10px] bg-[#001534] rounded-full'><Image src='/assets/whitesearch1.svg' alt='search' width={20} height={20} /></div>
                            }
                        </Button>

                    </div>
                </form>
            </Form>
            <Link href="/chat" className="w-fit mt-[26px] mb-[20px] mx-auto bg-white border-2 text-black  border-[#E2E2E4] rounded-[53px] p-[7px] px-[11px]  h-full hover:drop-shadow-[10px_9px_22px_rgba(20,78,227,0.38)] flex items-center gap-2" >
                <div className='p-[10px] bg-[#001534] rounded-full w-fit'><Image src='/assets/up.svg' alt='up' width={20} height={20} /></div>
                <p>Chat with AI</p>
            </Link>
        </div>
    )
}

export default SearchProduct