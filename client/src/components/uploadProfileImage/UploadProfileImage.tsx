import { Avatar, Button, Grid, Text, rem } from '@mantine/core'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { object, z } from 'zod'
import { useUploadMutation } from '../../app/features/upload/uploadApiSlice'
import { useAppDispatch, useAppSelector, useUserDetails } from '../../hooks/hooks'
import { FileInput } from "../../components/form/custom_input_fields/fileInput/FileInput"
import { selectUser, updateProfileImage } from '../../app/features/users/userSlice'
import { uploadProfileImageStyles } from './upload_profile_image_styles'

const imageUploadSchema = object({
    profileImage: z.instanceof(File),
})

export type UploadImageType = z.infer<typeof imageUploadSchema>;

export function UploadProfileImage() {
    const { classes } = uploadProfileImageStyles()
    const [userDetails] = useUserDetails()
    //initialize state with image from user state
    const profileImg: any = useAppSelector(selectUser)
    const [profileImage, setProfileImage] = useState(profileImg?.profileImage)
    const dispatch = useAppDispatch()

    const {
        control,
        handleSubmit
    } = useForm<UploadImageType>({
        resolver: zodResolver(imageUploadSchema),
    });

    const [upload, { isLoading, isSuccess }] = useUploadMutation()
    if (isLoading) {
        return <p>Loading...</p>
    }

    const onSubmit: SubmitHandler<UploadImageType> = async (values: any) => {
        const formData = new FormData()
        formData.append('profileImage', values.profileImage);
        values.userEmail = userDetails.user?.email
        formData.append('userEmail', values.userEmail)
        const user = await upload(formData)
        const { data }: any = user
        setProfileImage(data.profileImagePath)
        dispatch(updateProfileImage(data))
    }

    return (
        <>
            <Grid justify="space-around" align="center">
                <Grid.Col sm={6}>
                    <Text size="md">Upload/Update your profile Image</Text>
                </Grid.Col>
                <Grid.Col sm={6}>
                    <Avatar className={classes.avatar} src={profileImage} w={rem(300)} h={rem(300)} color="orange" radius="xl" mb="lg" />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FileInput
                            control={control}
                            placeholder="Choose image"
                            size="md"
                            radius="md"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                        />
                        <Button mt={rem(10)} type="submit" radius="xl">
                            Save
                        </Button>
                        {isSuccess &&
                            <p>
                                Image saved successfully
                            </p>
                        }
                    </form>
                </Grid.Col>
            </Grid>
        </>
    )
}