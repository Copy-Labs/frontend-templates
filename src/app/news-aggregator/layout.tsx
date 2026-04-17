import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NewsWire - Your AI-Powered News Aggregator",
  description: "Stay informed with curated news feeds, AI-generated summaries, and personalized reading experiences",
};

/*Hi @sebs. Thanks for your feedback. It really helped shaped the dapp much better.
Apologies I have not been able to make this changes earlier. I wasn't able to implement the fixes earlier,
But based on your feedback, here are the changes I made.

1. Fixed the spendRejected bug - spend() no longer reverts when the limit is exceeded — it emits SpendRejected and returns false. The event is now real and observable on-chain.
2. `transfer()` is now `call()` - Value is now sent with to.call{value: amount}("") + a TransferFailed revert if it fails — works correctly with contract recipients
3. Two-step ownership implemented - A new owner must explicitly confirm before the handover completes.
4. Limit applies next window fixed
5. Minimum window duration fixed
6. Zero-value deposit guard - deposit() reverts on msg.value == 0; receive() silently ignores zero-value calls instead of emitting noise

Hopefully I still have time for the finished product to be reviewed.

Here is the update github repo:
https://github.com/MayowaObisesan/Spend-Limit-Wallet*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
