


export default function CommentBox(props) {
    return (
        <div className="border mx-9 my-4 p-4 rounded-lg">
            <div className="font-bold text-lg">
                @{props?.data?.value?.user?.username}
            </div>
            <div>
                {props?.data?.value?.comment}
            </div>
        </div>
    )
}
