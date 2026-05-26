import { Box } from '@radix-ui/themes'

export function DecorativeLayer() {
  return (
    <Box aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <Box className="absolute inset-x-6 top-[88px] hidden h-px bg-gradient-to-r from-transparent via-[#F43F5E]/35 to-transparent md:block" />
      <Box className="absolute inset-x-6 bottom-10 hidden h-px bg-gradient-to-r from-transparent via-[#FFF8F8]/10 to-transparent md:block" />

      <Box className="absolute left-6 top-[118px] hidden h-[46vh] w-px bg-gradient-to-b from-[#F43F5E]/45 via-[#F43F5E]/10 to-transparent lg:block" />
      <Box className="absolute right-6 top-[118px] hidden h-[46vh] w-px bg-gradient-to-b from-[#F43F5E]/45 via-[#F43F5E]/10 to-transparent lg:block" />

      <Box className="absolute left-6 top-[118px] hidden h-8 w-8 border-l border-t border-[#F43F5E]/40 lg:block" />
      <Box className="absolute right-6 top-[118px] hidden h-8 w-8 border-r border-t border-[#F43F5E]/40 lg:block" />
      <Box className="absolute bottom-10 left-6 hidden h-8 w-8 border-b border-l border-[#FFF8F8]/12 lg:block" />
      <Box className="absolute bottom-10 right-6 hidden h-8 w-8 border-b border-r border-[#FFF8F8]/12 lg:block" />

      <Box
        className="absolute -right-24 top-28 hidden h-[520px] w-[520px] opacity-[0.08] lg:block"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent 0 16px, #FFF8F8 16px 17px, transparent 17px 34px)',
        }}
      />
      <Box
        className="absolute -left-20 bottom-24 hidden h-[360px] w-[360px] opacity-[0.07] lg:block"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent 0 18px, #F43F5E 18px 19px, transparent 19px 36px)',
        }}
      />
    </Box>
  )
}
