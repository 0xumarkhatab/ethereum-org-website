/* eslint-disable react/jsx-key */
import * as React from "react"
import { createIcon } from "@chakra-ui/react"
import { commonIconDefaultProps } from "../utils"

export const BuyCryptoIcon = createIcon({
  displayName: "BuyCryptoIcon",
  viewBox: "0 0 256 256",
  defaultProps: {
    width: "256px",
    height: "256px",
    ...commonIconDefaultProps,
  },
  path: [
    <path d="M48 42.6649C45.0536 42.6649 42.665 45.0535 42.665 47.9999C42.665 50.9464 45.0536 53.3349 48 53.3349H64.0845V174C64.0845 177.499 66.9208 180.335 70.4195 180.335H95.3849C89.2823 182.915 85 188.957 85 196C85 205.389 92.6112 213 102 213C111.389 213 119 205.389 119 196C119 188.957 114.718 182.915 108.615 180.335H164.385C158.282 182.915 154 188.957 154 196C154 205.389 161.611 213 171 213C180.389 213 188 205.389 188 196C188 188.957 183.718 182.915 177.615 180.335H181C183.946 180.335 186.335 177.946 186.335 175C186.335 172.053 183.946 169.665 181 169.665H74.7545V48.9999C74.7545 45.5012 71.9182 42.6649 68.4195 42.6649H48Z" />,
    <path d="M142.654 82.9681C145.29 80.8241 149.069 80.8241 151.704 82.9681C153.289 84.2576 155.349 84.8095 157.367 84.4854C160.721 83.9464 163.993 85.8356 165.204 89.0102C165.932 90.9195 167.44 92.4274 169.349 93.1554C172.524 94.3659 174.413 97.6382 173.874 100.993C173.55 103.01 174.102 105.07 175.391 106.655C177.535 109.291 177.535 113.069 175.391 115.705C174.102 117.29 173.55 119.35 173.874 121.367C174.413 124.722 172.524 127.994 169.349 129.205C167.44 129.933 165.932 131.441 165.204 133.35C163.993 136.524 160.721 138.414 157.367 137.875C155.349 137.55 153.289 138.102 151.704 139.392C149.069 141.536 145.29 141.536 142.654 139.392C141.069 138.102 139.009 137.55 136.992 137.875C133.637 138.414 130.365 136.524 129.155 133.35C128.427 131.441 126.919 129.933 125.01 129.205C121.835 127.994 119.946 124.722 120.485 121.367C120.809 119.35 120.257 117.29 118.967 115.705C116.823 113.069 116.823 109.291 118.967 106.655C120.257 105.07 120.809 103.01 120.485 100.993C119.946 97.6382 121.835 94.3659 125.01 93.1554C126.919 92.4274 128.427 90.9195 129.155 89.0103C130.365 85.8356 133.637 83.9464 136.992 84.4854C139.009 84.8095 141.069 84.2576 142.654 82.9681ZM148.414 93.1251C148.018 92.532 147.146 92.532 146.751 93.1251L137.039 107.675C136.721 108.151 136.867 108.795 137.358 109.089L147.07 114.887C147.385 115.076 147.779 115.076 148.095 114.887L157.807 109.089C158.298 108.795 158.443 108.151 158.126 107.675L148.414 93.1251ZM148.667 128.807C148.269 129.381 147.421 129.381 147.023 128.807L139.191 117.514C138.573 116.623 139.617 115.523 140.539 116.094L147.319 120.288C147.641 120.488 148.049 120.488 148.371 120.288L155.151 116.094C156.073 115.523 157.117 116.623 156.499 117.514L148.667 128.807Z" />,
    <path d="M84.6641 79.6699C84.6641 70.8303 91.83 63.6644 100.67 63.6644H209.229C220.557 63.6644 228.3 75.1084 224.087 85.6231L198.579 149.283C196.146 155.355 190.263 159.335 183.721 159.335H100.67C91.83 159.335 84.6641 152.17 84.6641 143.33V79.6699ZM100.67 74.3354C97.7234 74.3354 95.3351 76.7238 95.3351 79.6699V143.33C95.3351 146.276 97.7234 148.664 100.67 148.664H183.721C185.902 148.664 187.862 147.338 188.673 145.314L214.181 81.6541C215.585 78.1496 213.005 74.3354 209.229 74.3354H100.67Z" />,
  ],
})
