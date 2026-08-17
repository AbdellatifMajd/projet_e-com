import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

function PaypalSuccessPage() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 py-10">
      <Card className="w-full max-w-3xl overflow-hidden rounded-none border-2 border-black shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">

          {/* Left column — cover block */}
          <div className="bg-black text-white p-8 flex flex-col justify-between">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-white/60 mb-8">
                Confirmation No. 01
              </p>
              <p className="text-7xl font-serif leading-none">✓</p>
            </div>

            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-white/60">
                Status
              </p>
              <p className="font-serif text-2xl mt-1">Confirmed</p>
            </div>
          </div>

          {/* Right column — editorial content */}
          <div className="p-10 flex flex-col justify-center">
            <p className="uppercase tracking-[0.25em] text-xs text-neutral-500 mb-3">
              Payment · PayPal
            </p>

            <h1 className="font-serif text-5xl leading-[1.05] mb-4">
              Payment
              <br />
              successful.
            </h1>

            <div className="w-12 h-[2px] bg-black mb-4" />

            <p className="text-neutral-600 text-base leading-relaxed mb-8">
              Your transaction has been successfully confirmed. A summary of
              your order is available in your customer account.
            </p>

            <Button
              variant="outline"
              className="group w-fit rounded-none border-black text-black hover:bg-black hover:text-white transition-colors px-6 py-5 uppercase tracking-widest text-xs"
              onClick={() => navigate("/shop/account")}
            >
              View my orders
              <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PaypalSuccessPage