import { gql } from "@apollo/client";

export const CREATE_NEW_COMPONENT = gql`
    mutation CreateNewComponent(
        $groupId: String!
        $tierLevel: Int!
        $price: Float!
        $limited: Int!
        $svg: String!
        $width: Int!
        $top: Int!
        $left: Int!
    ) {
        createNewComponent(
            groupId: $groupId
            tierLevel: $tierLevel
            price: $price
            limited: $limited
            svg: $svg
            width: $width
            top: $top
            left: $left
        ) {
            groupId
            compId
            tierLevel
            price
            limited
            svg
            width
            top
            left
        } 
    }
`;

export const CREATE_NEW_AVATAR = gql`
    mutation CreateNewAvatar(
        $fname: String!
        $surname: String!
        $skillSet: [SkillSetInput]!
        $avatarSet: [AvatarSetInput]
        $factsSet: [FactsInput]
        $hairColor: String
        $details: String
    ) {
        createNewAvatar(
            fname: $fname
            surname: $surname
            skillSet: $skillSet
            avatarSet: $avatarSet
            factsSet: $factsSet
            hairColor: $hairColor
            details: $details
        ) {
            id
        }
    }
`;

export const UPDATE_AVATAR_PROFILE = gql`
    mutation UpdateAvatarProfile(
        $id: Int!
        $fname: String!
        $surname: String!
        $skillSet: [SkillSetInput]!
        $avatarSet: [AvatarSetInput]
        $factsSet: [FactsInput]
        $hairColor: String
        $details: String
    ) {
        updateAvatarProfile(
            id: $id
            fname: $fname
            surname: $surname
            skillSet: $skillSet
            avatarSet: $avatarSet
            factsSet: $factsSet
            hairColor: $hairColor
            details: $details
        ) 
    }
`;

export const UPDATE_AVATARSET = gql`
    mutation updateAvatarSet(
        $components: [AvatarSetInput]
        $hairColor: String
    ) {
        updateAvatarSet(
            components:  $components
            hairColor: $hairColor
        ) {
            id
            regDate
            updateDate
            deleted
            groupId
            compId
        }
    }
`;